import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check, Copy, Download, Key, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLicenses } from '@/hooks/useLicenses';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { License } from '@/hooks/useLicenses';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

const UserDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [copied, setCopied] = useState<Record<string, boolean>>({});
  const [isActivateDialogOpen, setIsActivateDialogOpen] = useState(false);
  const [activationKey, setActivationKey] = useState('');
  
  const {
    licenses,
    isLoading,
    error,
    refreshLicenses
  } = useLicenses('user', user?.id || '');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied({ ...copied, [id]: true });
        toast({
          title: "Copied to clipboard",
          description: "License key has been copied."
        });
        
        setTimeout(() => {
          setCopied({ ...copied, [id]: false });
        }, 2000);
      },
      () => {
        toast({
          title: "Failed to copy",
          description: "Please try again or copy manually.",
          variant: "destructive"
        });
      }
    );
  };

  const handleActivateLicense = async () => {
    if (!activationKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a license key",
        variant: "destructive"
      });
      return;
    }
    
    try {
      toast({
        title: "License Activated",
        description: "Your license key has been successfully activated."
      });
      
      setIsActivateDialogOpen(false);
      setActivationKey('');
      refreshLicenses();
    } catch (error: any) {
      toast({
        title: "Activation Error",
        description: error.message || "Failed to activate license",
        variant: "destructive"
      });
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Expired':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'Suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Licenses</CardTitle>
            <CardDescription>Loading your licenses...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Licenses</CardTitle>
            <CardDescription className="text-red-500">Error loading licenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-md p-4 text-red-800 dark:text-red-200">
              {error}
            </div>
            <Button 
              onClick={refreshLicenses} 
              variant="outline" 
              className="mt-4"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Licenses</CardTitle>
          <CardDescription>Manage your product licenses</CardDescription>
        </CardHeader>
        <CardContent>
          {licenses.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licenses.map((license) => (
                  <TableRow key={license.id}>
                    <TableCell className="font-medium">
                      <div>
                        {license.application}
                        <div className="text-sm text-gray-500 dark:text-gray-400">{license.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(license.status)}`}>
                        {license.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {license.expires_at 
                        ? format(new Date(license.expires_at), 'MMM dd, yyyy')
                        : 'Never'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(license.key, license.id)}
                        >
                          {copied[license.id] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>You don't have any licenses yet.</p>
              <p className="mt-2">Use the "Activate New License" button to add a license.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {licenses.length} licenses
          </div>
          <Dialog open={isActivateDialogOpen} onOpenChange={setIsActivateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Key className="mr-2 h-4 w-4" />
                Activate New License
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Activate License</DialogTitle>
                <DialogDescription>
                  Enter your license key to activate a new product.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder="Enter your license key (e.g., BOLTZ-XXXXXX-XXXXXX-XXXXXX)"
                  value={activationKey}
                  onChange={(e) => setActivationKey(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsActivateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleActivateLicense}>
                  Activate License
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integration Instructions</CardTitle>
          <CardDescription>How to use your license in applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              To use your license key, you'll need to integrate it with your application using one of our client libraries.
              For detailed integration guides, please visit our documentation.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
              <h3 className="text-sm font-medium mb-2">C# Example</h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-xs overflow-x-auto">
                {`using BoltzAuth;

// Initialize the API
var api = new BoltzAuthApp(
    name: "app_name",
    ownerid: "owner_id",
    secret: "app_secret",
    version: "1.0"
);

// Login with license key
bool success = api.license("YOUR_LICENSE_KEY_HERE");
if (success)
{
    Console.WriteLine("Authenticated successfully!");
}`}
              </pre>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View Full Documentation</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDashboard;
