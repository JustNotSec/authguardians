
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, Users, Key, ShieldCheck, Clock } from 'lucide-react';

const DashboardPreview = () => {
  // Sample data for charts
  const activityData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 19 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 27 },
    { name: 'Fri', value: 24 },
    { name: 'Sat', value: 16 },
    { name: 'Sun', value: 8 },
  ];

  const licenseData = [
    { name: 'Active', value: 65 },
    { name: 'Expired', value: 25 },
    { name: 'Trial', value: 10 },
  ];

  const COLORS = ['#4F46E5', '#94A3B8', '#22C55E'];

  const statCards = [
    { title: 'Total Users', value: '1,245', icon: Users, change: '+12%', color: 'text-blue-600' },
    { title: 'Licenses', value: '782', icon: Key, change: '+8%', color: 'text-indigo-600' },
    { title: 'Security Events', value: '24', icon: ShieldCheck, change: '-5%', color: 'text-green-600' },
    { title: 'Avg. Session', value: '18m', icon: Clock, change: '+2%', color: 'text-orange-600' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-xl overflow-hidden shadow-glass border border-white/10 dark:border-gray-800/50">
      <div className="p-3">
        <div className="relative aspect-video w-full bg-gray-50 dark:bg-gray-900 rounded-md overflow-hidden">
          <div className="absolute inset-0 p-4 flex flex-col">
            {/* Dashboard Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Dashboard Overview</h3>
              <div className="flex space-x-2">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {statCards.map((stat, i) => (
                <Card key={i} className="bg-white dark:bg-gray-800 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                        <p className="text-xl font-semibold">{stat.value}</p>
                      </div>
                      <div className={`rounded-full p-2 ${stat.color} bg-opacity-10`}>
                        <stat.icon className={stat.color} size={16} />
                      </div>
                    </div>
                    <div className="flex items-center mt-2 text-xs">
                      <span className={`${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                        {stat.change} <ArrowUpRight size={12} className="ml-0.5" />
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">vs last week</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Charts Row */}
            <div className="grid grid-cols-3 gap-4 flex-grow">
              {/* Activity Chart */}
              <Card className="col-span-2 bg-white dark:bg-gray-800 shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Authentication Activity</h4>
                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="h-full w-full" style={{ height: "130px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={activityData}>
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4F46E5" barSize={20} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* License Distribution */}
              <Card className="bg-white dark:bg-gray-800 shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">License Status</h4>
                    <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="h-full w-full" style={{ height: "130px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={licenseData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {licenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
