
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Users, Key, ShoppingCart, DollarSign, Plus } from 'lucide-react';

const ResellerDashboard = () => {
  const stats = [
    { title: 'Total Customers', value: '124', icon: <Users className="h-5 w-5 text-blue-500" /> },
    { title: 'Available Licenses', value: '43', icon: <Key className="h-5 w-5 text-green-500" /> },
    { title: 'License Sales', value: '309', icon: <ShoppingCart className="h-5 w-5 text-purple-500" /> },
    { title: 'Revenue', value: '$4,238', icon: <DollarSign className="h-5 w-5 text-orange-500" /> },
  ];

  const recentCustomers = [
    { id: 1, name: 'John Smith', email: 'john@example.com', status: 'Active', joined: '2 hours ago' },
    { id: 2, name: 'Emma Wilson', email: 'emma@example.com', status: 'Active', joined: '1 day ago' },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', status: 'Active', joined: '3 days ago' },
  ];

  const availableLicenses = [
    { id: 'LIC-BATCH-32', application: 'Desktop App Pro', quantity: 15, price: '$29.99' },
    { id: 'LIC-BATCH-31', application: 'Mobile Suite', quantity: 8, price: '$19.99' },
    { id: 'LIC-BATCH-30', application: 'Data Analyzer', quantity: 20, price: '$49.99' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Create License Key
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Customers</CardTitle>
              <CardDescription>Users who purchased your licenses</CardDescription>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      <div>
                        {customer.name}
                        <div className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {customer.status}
                      </span>
                    </TableCell>
                    <TableCell>{customer.joined}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Available Licenses</CardTitle>
              <CardDescription>License keys ready for sale</CardDescription>
            </div>
            <Button variant="outline" size="sm">Purchase More</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableLicenses.map((license) => (
                  <TableRow key={license.id}>
                    <TableCell className="font-medium">
                      <div>
                        {license.application}
                        <div className="text-sm text-gray-500 dark:text-gray-400">{license.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{license.quantity}</TableCell>
                    <TableCell>{license.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResellerDashboard;
