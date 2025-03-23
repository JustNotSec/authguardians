import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface License {
  id: string;
  key: string;
  application: string;
  user_id: string | null;
  created_by: string | null;
  created_at: string | null;
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
      // First, let's query just the licenses without the join that's causing issues
      let query = supabase.from('licenses').select('*');

      if (userRole === 'reseller') {
        query = query.eq('created_by', userId);
      } else if (userRole === 'user') {
        query = query.eq('user_id', userId);
      }

      const { data: licensesData, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      
      // Now if we need user profile data, fetch it separately for licenses with a user_id
      const processedData: License[] = [];
      
      for (const license of licensesData || []) {
        let userEmail = 'No user assigned';
        let userName = 'No user assigned';
        
        if (license.user_id) {
          // Fetch the profile for this user_id
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('id, first_name, last_name, email')
            .eq('id', license.user_id)
            .maybeSingle();
            
          if (!profileError && profileData) {
            userEmail = profileData.email || 'No email';
            userName = profileData.first_name && profileData.last_name 
              ? `${profileData.first_name} ${profileData.last_name}`
              : 'User';
          }
        }
        
        const formattedLicense: License = {
          id: license.id,
          key: license.key,
          application: license.application,
          user_id: license.user_id,
          created_by: license.created_by,
          created_at: license.created_at,
          expires_at: license.expires_at,
          status: (license.status as 'Active' | 'Expired' | 'Suspended') || 'Active',
          metadata: license.metadata,
          user_email: userEmail,
          user_name: userName
        };
        
        processedData.push(formattedLicense);
      }
      
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
      let userId = null;
      
      if (data.userEmail) {
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select(`
            id,
            email:id (
              email
            )
          `)
          .eq('id.email', data.userEmail)
          .maybeSingle();
          
        if (userError) {
          console.error('Error finding user:', userError);
        }
        
        if (userData) {
          userId = userData.id;
        }
      }
      
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
    console.log('Fetching licenses for:', userRole, userId);
    if (!userId) {
      console.log('No userId provided, skipping license fetch');
      setIsLoading(false);
      return;
    }
    
    fetchLicenses();
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
          console.log('License data changed, refreshing');
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
