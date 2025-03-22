
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Key, Package, BarChart3, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '2,543', icon: <Users className="h-5 w-5 text-blue-500" /> },
    { title: 'Active Licenses', value: '1,832', icon: <Key className="h-5 w-5 text-green-500" /> },
    { title: 'Applications', value: '9', icon: <Package className="h-5 w-5 text-purple-500" /> },
    { title: 'Monthly Revenue', value: '$12,435', icon: <DollarSign className="h-5 w-5 text-orange-500" /> },
  ];

  const recentUsers = [
    { id: 1, name: 'John Smith', email: 'john@example.com', status: 'Active', joined: '2 hours ago' },
    { id: 2, name: 'Emma Wilson', email: 'emma@example.com', status: 'Active', joined: '5 hours ago' },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', status: 'Active', joined: '1 day ago' },
    { id: 4, name: 'Sophia Brown', email: 'sophia@example.com', status: 'Pending', joined: '2 days ago' },
    { id: 5, name: 'William Lee', email: 'william@example.com', status: 'Active', joined: '3 days ago' },
  ];

  const recentLicenses = [
    { id: 'LIC-4930', user: 'John Smith', application: 'Desktop App Pro', created: '2 hours ago', expires: '1 year' },
    { id: 'LIC-4929', user: 'Emma Wilson', application: 'Mobile Suite', created: '5 hours ago', expires: '6 months' },
    { id: 'LIC-4928', user: 'Michael Johnson', application: 'Data Analyzer', created: '1 day ago', expires: '1 month' },
    { id: 'LIC-4927', user: 'Sophia Brown', application: 'Desktop App Pro', created: '2 days ago', expires: 'Lifetime' },
    { id: 'LIC-4926', user: 'William Lee', application: 'Mobile Suite', created: '3 days ago', expires: '1 year' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest user registrations</CardDescription>
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
                {recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div>
                        {user.name}
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.joined}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Licenses</CardTitle>
            <CardDescription>Latest license activations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Expires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLicenses.map((license) => (
                  <TableRow key={license.id}>
                    <TableCell className="font-medium">
                      <div>
                        {license.id}
                        <div className="text-sm text-gray-500 dark:text-gray-400">{license.application}</div>
                      </div>
                    </TableCell>
                    <TableCell>{license.user}</TableCell>
                    <TableCell>{license.expires}</TableCell>
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

export default AdminDashboard;
