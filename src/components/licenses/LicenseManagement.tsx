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
  Download
} from 'lucide-react';
import { useLicenses, License } from '@/hooks/useLicenses';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';

interface LicenseManagementProps {
  userRole: string;
}

const LicenseManagement = ({ userRole }: LicenseManagementProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [applicationFilter, setApplicationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Form state for creating new license
  const [newLicenseApp, setNewLicenseApp] = useState('Desktop App Pro');
  const [newLicenseEmail, setNewLicenseEmail] = useState('');
  const [newLicenseExpiration, setNewLicenseExpiration] = useState('1-year');
  const [newLicenseQuantity, setNewLicenseQuantity] = useState(1);
  
  const { 
    licenses, 
    isLoading, 
    error, 
    createLicense, 
    updateLicense, 
    deleteLicense,
    refreshLicenses 
  } = useLicenses(userRole, user?.id || '');

  // Filter licenses based on search query and filters
  const filteredLicenses = licenses.filter(license => {
    // Search filter
    const matchesSearch = 
      license.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (license.user_name && license.user_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (license.user_email && license.user_email.toLowerCase().includes(searchQuery.toLowerCase()));
    
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
  const applications = [...new Set(licenses.map(license => license.application))];

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

  const handleCreateLicense = async () => {
    try {
      // Calculate expiration date based on selection
      let expiresAt = null;
      const now = new Date();
      
      if (newLicenseExpiration === '1-month') {
        const expiry = new Date(now);
        expiry.setMonth(expiry.getMonth() + 1);
        expiresAt = expiry.toISOString();
      } else if (newLicenseExpiration === '6-months') {
        const expiry = new Date(now);
        expiry.setMonth(expiry.getMonth() + 6);
        expiresAt = expiry.toISOString();
      } else if (newLicenseExpiration === '1-year') {
        const expiry = new Date(now);
        expiry.setFullYear(expiry.getFullYear() + 1);
        expiresAt = expiry.toISOString();
      }
      // If lifetime, expiresAt remains null
      
      // Create the specified number of licenses
      for (let i = 0; i < newLicenseQuantity; i++) {
        await createLicense({
          application: newLicenseApp,
          userEmail: newLicenseEmail || undefined,
          expiresAt: expiresAt || undefined,
          status: 'Active'
        });
      }
      
      setIsCreateDialogOpen(false);
      
      // Reset form
      setNewLicenseApp('Desktop App Pro');
      setNewLicenseEmail('');
      setNewLicenseExpiration('1-year');
      setNewLicenseQuantity(1);
      
      refreshLicenses();
    } catch (error) {
      console.error('Error creating license:', error);
    }
  };

  const handleSuspendLicense = async (license: License) => {
    try {
      const newStatus = license.status === 'Suspended' ? 'Active' : 'Suspended';
      await updateLicense(license.id, { status: newStatus });
      
      toast({
        title: newStatus === 'Suspended' ? "License Suspended" : "License Reactivated",
        description: `License ${license.id} has been ${newStatus === 'Suspended' ? 'suspended' : 'reactivated'}.`
      });
    } catch (error) {
      console.error('Error updating license status:', error);
    }
  };

  const handleDeleteLicense = async (licenseId: string) => {
    try {
      await deleteLicense(licenseId);
    } catch (error) {
      console.error('Error deleting license:', error);
    }
  };

  const handleExtendLicense = async (license: License, extensionPeriod: string) => {
    try {
      let newExpiresAt: Date;
      
      if (license.expires_at) {
        // If there's an existing expiration date, extend from that
        newExpiresAt = new Date(license.expires_at);
      } else {
        // Otherwise, extend from current date
        newExpiresAt = new Date();
      }
      
      // Add time based on selected period
      if (extensionPeriod === '1-month') {
        newExpiresAt.setMonth(newExpiresAt.getMonth() + 1);
      } else if (extensionPeriod === '6-months') {
        newExpiresAt.setMonth(newExpiresAt.getMonth() + 6);
      } else if (extensionPeriod === '1-year') {
        newExpiresAt.setFullYear(newExpiresAt.getFullYear() + 1);
      } else if (extensionPeriod === 'lifetime') {
        // For lifetime, set expires_at to null
        await updateLicense(license.id, { expires_at: null });
        
        toast({
          title: "License Extended",
          description: "License has been extended to never expire."
        });
        
        return;
      }
      
      await updateLicense(license.id, { 
        expires_at: newExpiresAt.toISOString(),
        status: 'Active' // Reactivate if it was expired
      });
      
      toast({
        title: "License Extended",
        description: `License expiration has been extended to ${format(newExpiresAt, 'PPP')}.`
      });
    } catch (error) {
      console.error('Error extending license:', error);
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

  // Different views for different user roles
  const isAdmin = userRole === 'admin';
  const isReseller = userRole === 'reseller';

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>License Management</CardTitle>
            <CardDescription>Loading licenses...</CardDescription>
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
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>License Management</CardTitle>
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
                      <Select 
                        value={newLicenseApp} 
                        onValueChange={setNewLicenseApp}
                      >
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
                      <label className="text-sm font-medium">User Email (Optional)</label>
                      <Input 
                        placeholder="user@example.com" 
                        value={newLicenseEmail}
                        onChange={(e) => setNewLicenseEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expiration</label>
                      <Select 
                        value={newLicenseExpiration}
                        onValueChange={setNewLicenseExpiration}
                      >
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
                      <Input 
                        type="number" 
                        value={newLicenseQuantity.toString()} 
                        onChange={(e) => setNewLicenseQuantity(parseInt(e.target.value) || 1)}
                        min="1" 
                        max="100" 
                      />
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
                            {license.user_name || 'No user assigned'}
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {license.user_email || 'No email'}
                            </div>
                          </div>
                        </TableCell>
                      )}
                      <TableCell>
                        {license.expires_at 
                          ? format(new Date(license.expires_at), 'MMM dd, yyyy')
                          : 'Never'}
                      </TableCell>
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
                                <DropdownMenuItem onClick={() => handleExtendLicense(license, '1-year')}>
                                  <Clock className="mr-2 h-4 w-4" />
                                  <span>Extend 1 Year</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSuspendLicense(license)}>
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
            Showing {filteredLicenses.length} of {licenses.length} licenses
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

