import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  Users, 
  FileCheck, 
  HeadphonesIcon, 
  DollarSign,
  History,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/bodyguards', icon: Shield, label: 'Bodyguards' },
    { path: '/clients', icon: Users, label: 'Clients' },
    { path: '/verification', icon: FileCheck, label: 'KYC Verification' },
    { path: '/support', icon: HeadphonesIcon, label: 'Support' },
    { path: '/payments', icon: DollarSign, label: 'Payments' },
    { path: '/audit', icon: History, label: 'Audit Logs' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-8">Guardian Admin</h1>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;