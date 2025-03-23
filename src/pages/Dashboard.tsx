
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import ResellerDashboard from '@/components/dashboard/ResellerDashboard';
import UserDashboard from '@/components/dashboard/UserDashboard';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { user, profile, isLoading, session } = useAuth();
  const navigate = useNavigate();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // After the initial loading is complete
      setIsInitialLoad(false);
      
      // If no user is found, redirect to login
      if (!user && !session) {
        console.log('No user found, redirecting to login');
        navigate('/login');
      }
    }
  }, [user, isLoading, navigate, session]);

  // If still in initial loading state, show loading skeleton
  if (isLoading || isInitialLoad) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
        <div className="w-64 h-full bg-white dark:bg-gray-800 shadow-sm">
          <Skeleton className="h-full w-full" />
        </div>
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="h-16 border-b bg-white dark:bg-gray-800">
            <Skeleton className="h-full w-full" />
          </div>
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col space-y-6">
                <Skeleton className="h-8 w-64 mb-4" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Extra safety check - if after loading we still don't have a user, redirect to login
  if (!user || !profile) {
    console.log('Dashboard: no user or profile after loading');
    navigate('/login');
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      <DashboardSidebar role={profile.role} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardNavbar user={{
          email: user.email || '',
          role: profile.role,
          firstName: profile.first_name,
          lastName: profile.last_name
        }} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              </div>
              
              {profile.role === 'admin' && <AdminDashboard />}
              {profile.role === 'reseller' && <ResellerDashboard />}
              {profile.role === 'user' && <UserDashboard />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
