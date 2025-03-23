import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Layers,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const menuItems = [
  {
    name: 'Products',
    path: '/admin/products',
    icon: Package
  },
  {
    name: 'FAQs',
    path: '/admin/faqs',
    icon: MessageSquare
  },
  {
    name: 'Reference Data',
    path: '/admin/reference-data',
    icon: Layers,
    state: { tab: 'surface_types' }
  },
  
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <LayoutDashboard className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Admin Panel</span>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path && 
                (!item.state?.tab || location.state?.tab === item.state.tab);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  state={item.state}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto"
                      initial={false}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors w-full px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}