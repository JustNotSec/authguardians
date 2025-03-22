
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Key, 
  Package, 
  Settings,
  ShieldCheck,
  BarChart,
  FileText,
  Store,
  Bell,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const SidebarLink = ({ to, icon, label, active }: SidebarLinkProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
      active ? "bg-blue-100 text-blue-600 dark:bg-blue-800/30 dark:text-blue-400" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/30"
    )}
  >
    <span className="mr-3 h-5 w-5">{icon}</span>
    {label}
  </Link>
);

interface DashboardSidebarProps {
  role: string;
}

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Base navigation items for all users
  const commonLinks = [
    { to: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
    { to: '/settings', icon: <Settings />, label: 'Settings' },
    { to: '/help', icon: <HelpCircle />, label: 'Help' },
  ];

  // Admin-specific links
  const adminLinks = [
    { to: '/users', icon: <Users />, label: 'Users' },
    { to: '/applications', icon: <Package />, label: 'Applications' },
    { to: '/licenses', icon: <Key />, label: 'Licenses' },
    { to: '/resellers', icon: <Store />, label: 'Resellers' },
    { to: '/security', icon: <ShieldCheck />, label: 'Security' },
    { to: '/analytics', icon: <BarChart />, label: 'Analytics' },
    { to: '/logs', icon: <FileText />, label: 'Logs' },
  ];

  // Reseller-specific links
  const resellerLinks = [
    { to: '/customers', icon: <Users />, label: 'Customers' },
    { to: '/licenses', icon: <Key />, label: 'Licenses' },
    { to: '/sales', icon: <BarChart />, label: 'Sales' },
  ];

  // User-specific links
  const userLinks = [
    { to: '/licenses', icon: <Key />, label: 'My Licenses' },
    { to: '/notifications', icon: <Bell />, label: 'Notifications' },
  ];

  // Select links based on user role
  let roleSpecificLinks = [];
  switch (role) {
    case 'admin':
      roleSpecificLinks = adminLinks;
      break;
    case 'reseller':
      roleSpecificLinks = resellerLinks;
      break;
    default:
      roleSpecificLinks = userLinks;
  }

  // Combine common links with role-specific links
  const links = [...roleSpecificLinks, ...commonLinks];

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col h-full">
        <div className="flex items-center h-16 px-6 border-b">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">BoltzAuth</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {links.map((link) => (
              <SidebarLink
                key={link.to}
                to={link.to}
                icon={link.icon}
                label={link.label}
                active={isActive(link.to)}
              />
            ))}
          </nav>
        </div>
        
        <div className="px-3 py-4 border-t">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
              {role.charAt(0).toUpperCase() + role.slice(1)} Access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
