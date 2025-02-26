import { NavLink } from 'react-router-dom';
import { Receipt, FileText, BookOpen, Plus } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    {
      path: '/dashboard/money-receipt',
      icon: <Receipt className="w-5 h-5" />,
      label: 'Money Receipt'
    },
    {
      path: '/dashboard/money-receipt/create',
      icon: <Plus className="w-5 h-5" />,
      label: 'Create Receipt'
    },
    {
      path: '/dashboard/invoice',
      icon: <FileText className="w-5 h-5" />,
      label: 'Invoice'
    },
    {
      path: '/dashboard/training-request',
      icon: <BookOpen className="w-5 h-5" />,
      label: 'Training Request'
    }
  ];

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;