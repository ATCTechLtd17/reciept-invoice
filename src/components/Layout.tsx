import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Receipt, Settings, Users, BarChart3, FileText } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Layout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">RMS</h1>
        </div>
        <nav className="mt-8">
          <Link
            to="/dashboard"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive('/dashboard') ? 'bg-gray-100 border-r-4 border-blue-500' : ''
            }`}
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="/money-receipts"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive('/money-receipts') ? 'bg-gray-100 border-r-4 border-blue-500' : ''
            }`}
          >
            <Receipt className="w-5 h-5 mr-3" />
            Money Receipts
          </Link>
          <Link
            to="/invoices"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive('/invoices') ? 'bg-gray-100 border-r-4 border-blue-500' : ''
            }`}
          >
            <FileText className="w-5 h-5 mr-3" />
            Invoices
          </Link>
          <Link
            to="/users"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive('/users') ? 'bg-gray-100 border-r-4 border-blue-500' : ''
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Users
          </Link>
          <Link
            to="/settings"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive('/settings') ? 'bg-gray-100 border-r-4 border-blue-500' : ''
            }`}
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={handleSignOut}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}