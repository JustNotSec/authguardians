
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface License {
  id: string;
  key: string;
  application: string;
  user_id: string | null;
  created_by: string;
  created_at: string;
  expires_at: string | null;
  status: 'Active' | 'Expired' | 'Suspended';
  metadata: any;
  user_email?: string;
  user_name?: string;
}

export const useLicenses = (userRole: string, userId: string) => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLicenses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let query = supabase.from('licenses').select(`
        *,
        profiles:user_id (
          id,
          first_name,
          last_name,
          email:id (
            email
          )
        )
      `);

      // No additional filters for admin, they can see all
      if (userRole === 'reseller') {
        // Resellers see licenses they created
        query = query.eq('created_by', userId);
      } else if (userRole === 'user') {
        // Users see only their licenses
        query = query.eq('user_id', userId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Process the data to format it correctly
      const processedData = data?.map(license => {
        const userProfile = license.profiles as any;
        
        return {
          ...license,
          user_email: userProfile?.email?.email || 'No user assigned',
          user_name: userProfile?.first_name && userProfile?.last_name
            ? `${userProfile.first_name} ${userProfile.last_name}`
            : 'No user assigned'
        };
      }) || [];

      setLicenses(processedData);
    } catch (err: any) {
      console.error('Error fetching licenses:', err);
      setError(err.message || 'Failed to fetch licenses');
      toast({
        title: 'Error',
        description: err.message || 'Failed to fetch licenses',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createLicense = async (data: {
    application: string;
    userEmail?: string;
    expiresAt?: string;
    status?: 'Active' | 'Suspended';
  }) => {
    try {
      // First, check if the user exists
      let userId = null;
      
      if (data.userEmail) {
        const { data: userData, error: userError } = await supabase
          .from('auth.users')
          .select('id')
          .eq('email', data.userEmail)
          .single();
          
        if (userError && userError.code !== 'PGRST116') {
          throw userError;
        }
        
        if (userData) {
          userId = userData.id;
        }
      }
      
      // Generate a license key
      const { data: keyData, error: keyError } = await supabase
        .rpc('generate_license_key');
        
      if (keyError) throw keyError;
      
      const licenseKey = keyData || `BOLTZ-${Math.random().toString(36).substring(2, 8)}-${Math.random().toString(36).substring(2, 8)}-${Math.random().toString(36).substring(2, 8)}`;
      
      const { data: newLicense, error } = await supabase
        .from('licenses')
        .insert({
          key: licenseKey,
          application: data.application,
          user_id: userId,
          created_by: userId,
          expires_at: data.expiresAt || null,
          status: data.status || 'Active'
        })
        .select('*')
        .single();
        
      if (error) throw error;
      
      toast({
        title: 'License Created',
        description: 'New license has been created successfully.'
      });
      
      // Refresh the licenses
      fetchLicenses();
      
      return newLicense;
    } catch (err: any) {
      console.error('Error creating license:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to create license',
        variant: 'destructive'
      });
      throw err;
    }
  };

  const updateLicense = async (licenseId: string, data: Partial<License>) => {
    try {
      const { error } = await supabase
        .from('licenses')
        .update(data)
        .eq('id', licenseId);
        
      if (error) throw error;
      
      toast({
        title: 'License Updated',
        description: 'License has been updated successfully.'
      });
      
      // Refresh the licenses
      fetchLicenses();
    } catch (err: any) {
      console.error('Error updating license:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to update license',
        variant: 'destructive'
      });
      throw err;
    }
  };

  const deleteLicense = async (licenseId: string) => {
    try {
      const { error } = await supabase
        .from('licenses')
        .delete()
        .eq('id', licenseId);
        
      if (error) throw error;
      
      toast({
        title: 'License Deleted',
        description: 'License has been deleted successfully.'
      });
      
      // Refresh the licenses
      fetchLicenses();
    } catch (err: any) {
      console.error('Error deleting license:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to delete license',
        variant: 'destructive'
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchLicenses();
    // Listen for changes to the licenses table
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'licenses'
        },
        () => {
          fetchLicenses();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userRole, userId]);

  return {
    licenses,
    isLoading,
    error,
    refreshLicenses: fetchLicenses,
    createLicense,
    updateLicense,
    deleteLicense
  };
};
