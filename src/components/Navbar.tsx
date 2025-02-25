import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Receipt, History } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Receipt className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">ATC Money Receipt</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`inline-flex items-center px-4 py-2 my-4 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-indigo-50'
              }`}
            >
              <Receipt className="h-4 w-4 mr-2" />
              New Receipt
            </Link>
            <Link
              to="/history"
              className={`inline-flex items-center px-4 py-2 my-4 rounded-md text-sm font-medium ${
                location.pathname === '/history'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-indigo-50'
              }`}
            >
              <History className="h-4 w-4 mr-2" />
              Receipt History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;