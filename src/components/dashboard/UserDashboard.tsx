
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check, Copy, Download, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserDashboard = () => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState<Record<string, boolean>>({});

  const licenses = [
    { 
      id: 'LIC-4930', 
      key: 'BOLTZ-A1B2C3-D4E5F6-G7H8I9',
      application: 'Desktop App Pro', 
      created: 'May 15, 2023', 
      expires: 'May 15, 2024',
      status: 'Active'
    },
    { 
      id: 'LIC-4825', 
      key: 'BOLTZ-J1K2L3-M4N5O6-P7Q8R9',
      application: 'Mobile Suite', 
      created: 'January 3, 2023', 
      expires: 'January 3, 2024',
      status: 'Active'
    },
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied({ ...copied, [id]: true });
        toast({
          title: "Copied to clipboard",
          description: "License key has been copied."
        });
        
        // Reset the copied state after 2 seconds
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Licenses</CardTitle>
          <CardDescription>Manage your product licenses</CardDescription>
        </CardHeader>
        <CardContent>
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
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {license.status}
                    </span>
                  </TableCell>
                  <TableCell>{license.expires}</TableCell>
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
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {licenses.length} licenses
          </div>
          <Button variant="outline" size="sm">
            <Key className="mr-2 h-4 w-4" />
            Activate New License
          </Button>
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
