
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import ResellerDashboard from '@/components/dashboard/ResellerDashboard';
import UserDashboard from '@/components/dashboard/UserDashboard';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user || !profile) {
    return null; // The navigate in useEffect will handle redirect
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
