
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import LicenseManagement from '@/components/licenses/LicenseManagement';

interface User {
  email: string;
  role: 'admin' | 'reseller' | 'user';
  isLoggedIn: boolean;
  firstName?: string;
  lastName?: string;
}

const Licenses = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('boltzauth_user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }
    
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null; // The navigate in useEffect will handle redirect
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      <DashboardSidebar role={user.role} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardNavbar user={user} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">License Management</h1>
              </div>
              
              <LicenseManagement userRole={user.role} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Licenses;
