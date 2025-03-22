
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VerifyLicenseParams {
  licenseKey: string;
  applicationName?: string;
  hwid?: string;
}

interface VerifyLicenseResult {
  success: boolean;
  message: string;
  data?: {
    licenseId: string;
    application: string;
    status: string;
    expiresAt: string | null;
  };
}

export const useVerifyLicense = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyLicenseResult | null>(null);

  const verifyLicense = async ({ licenseKey, applicationName, hwid }: VerifyLicenseParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('verify-license', {
        body: {
          licenseKey,
          applicationName,
          hwid
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      setResult(data as VerifyLicenseResult);
      return data as VerifyLicenseResult;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to verify license';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      } as VerifyLicenseResult;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    verifyLicense,
    isLoading,
    error,
    result
  };
};
