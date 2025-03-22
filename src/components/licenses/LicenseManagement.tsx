
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Copy, 
  Trash2, 
  Clock, 
  Ban, 
  RefreshCw,
  Filter,
  Download
} from 'lucide-react';

interface LicenseItem {
  id: string;
  key: string;
  application: string;
  user: string;
  email: string;
  created: string;
  expires: string;
  status: 'Active' | 'Expired' | 'Suspended';
}

interface LicenseManagementProps {
  userRole: string;
}

const LicenseManagement = ({ userRole }: LicenseManagementProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [applicationFilter, setApplicationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Mock license data
  const licensesData: LicenseItem[] = [
    {
      id: 'LIC-4930',
      key: 'BOLTZ-A1B2C3-D4E5F6-G7H8I9',
      application: 'Desktop App Pro',
      user: 'John Smith',
      email: 'john@example.com',
      created: 'May 15, 2023',
      expires: 'May 15, 2024',
      status: 'Active'
    },
    {
      id: 'LIC-4929',
      key: 'BOLTZ-J1K2L3-M4N5O6-P7Q8R9',
      application: 'Mobile Suite',
      user: 'Emma Wilson',
      email: 'emma@example.com',
      created: 'April 20, 2023',
      expires: 'April 20, 2024',
      status: 'Active'
    },
    {
      id: 'LIC-4928',
      key: 'BOLTZ-S1T2U3-V4W5X6-Y7Z8A9',
      application: 'Data Analyzer',
      user: 'Michael Johnson',
      email: 'michael@example.com',
      created: 'March 10, 2023',
      expires: 'March 10, 2024',
      status: 'Active'
    },
    {
      id: 'LIC-4927',
      key: 'BOLTZ-B1C2D3-E4F5G6-H7I8J9',
      application: 'Desktop App Pro',
      user: 'Sophia Brown',
      email: 'sophia@example.com',
      created: 'February 5, 2023',
      expires: 'February 5, 2023',
      status: 'Expired'
    },
    {
      id: 'LIC-4926',
      key: 'BOLTZ-K1L2M3-N4O5P6-Q7R8S9',
      application: 'Mobile Suite',
      user: 'William Lee',
      email: 'william@example.com',
      created: 'January 15, 2023',
      expires: 'January 15, 2024',
      status: 'Suspended'
    },
  ];

  // Filter licenses based on search query and filters
  const filteredLicenses = licensesData.filter(license => {
    // Search filter
    const matchesSearch = 
      license.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Application filter
    const matchesApplication = 
      applicationFilter === 'all' || 
      license.application === applicationFilter;
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      license.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesApplication && matchesStatus;
  });

  // All unique applications for the filter
  const applications = [...new Set(licensesData.map(license => license.application))];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied to clipboard",
          description: "License key has been copied."
        });
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

  const handleCreateLicense = () => {
    toast({
      title: "License Created",
      description: "New license has been created successfully."
    });
    setIsCreateDialogOpen(false);
  };

  const handleSuspendLicense = (licenseId: string) => {
    toast({
      title: "License Suspended",
      description: `License ${licenseId} has been suspended.`
    });
  };

  const handleDeleteLicense = (licenseId: string) => {
    toast({
      title: "License Deleted",
      description: `License ${licenseId} has been deleted.`
    });
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

  // Different views for different user roles
  const isAdmin = userRole === 'admin';
  const isReseller = userRole === 'reseller';

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>License Management</CardTitle>
              <CardDescription>
                {isAdmin && "Manage all licenses in the system"}
                {isReseller && "Manage your customer licenses"}
                {!isAdmin && !isReseller && "Your active licenses"}
              </CardDescription>
            </div>
            {(isAdmin || isReseller) && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    Create License
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New License</DialogTitle>
                    <DialogDescription>
                      Generate a new license key for a user or application.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Application</label>
                      <Select defaultValue="Desktop App Pro">
                        <SelectTrigger>
                          <SelectValue placeholder="Select application" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Desktop App Pro">Desktop App Pro</SelectItem>
                          <SelectItem value="Mobile Suite">Mobile Suite</SelectItem>
                          <SelectItem value="Data Analyzer">Data Analyzer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">User Email</label>
                      <Input placeholder="user@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expiration</label>
                      <Select defaultValue="1-year">
                        <SelectTrigger>
                          <SelectValue placeholder="Select expiration period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-month">1 Month</SelectItem>
                          <SelectItem value="6-months">6 Months</SelectItem>
                          <SelectItem value="1-year">1 Year</SelectItem>
                          <SelectItem value="lifetime">Lifetime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantity</label>
                      <Input type="number" defaultValue="1" min="1" max="100" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateLicense}>
                      Create License
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search licenses..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={applicationFilter} onValueChange={setApplicationFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Application" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Applications</SelectItem>
                  {applications.map((app) => (
                    <SelectItem key={app} value={app}>{app}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License</TableHead>
                  {isAdmin && <TableHead>User</TableHead>}
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLicenses.length > 0 ? (
                  filteredLicenses.map((license) => (
                    <TableRow key={license.id}>
                      <TableCell className="font-medium">
                        <div>
                          {license.application}
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {license.id}
                          </div>
                        </div>
                      </TableCell>
                      {isAdmin && (
                        <TableCell>
                          <div>
                            {license.user}
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {license.email}
                            </div>
                          </div>
                        </TableCell>
                      )}
                      <TableCell>{license.expires}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(license.status)}`}>
                          {license.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => copyToClipboard(license.key)}>
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Copy Key</span>
                            </DropdownMenuItem>
                            {(isAdmin || isReseller) && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Clock className="mr-2 h-4 w-4" />
                                  <span>Extend</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSuspendLicense(license.id)}>
                                  {license.status === 'Suspended' ? (
                                    <>
                                      <RefreshCw className="mr-2 h-4 w-4" />
                                      <span>Reactivate</span>
                                    </>
                                  ) : (
                                    <>
                                      <Ban className="mr-2 h-4 w-4" />
                                      <span>Suspend</span>
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleDeleteLicense(license.id)}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isAdmin ? 5 : 4} className="text-center h-24 text-gray-500">
                      No licenses found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredLicenses.length} of {licensesData.length} licenses
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LicenseManagement;
