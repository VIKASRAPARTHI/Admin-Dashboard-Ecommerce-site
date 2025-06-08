import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  UserCheck,
  Package,
  BarChart3,
  Calendar,
  Kanban,
  Settings,
  Edit3
} from 'lucide-react';
import useStore from '../../store/useStore';

const Sidebar = () => {
  const { sidebarOpen } = useStore();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ShoppingCart, label: 'Orders', path: '/orders' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: UserCheck, label: 'Employees', path: '/employees' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Kanban, label: 'Kanban', path: '/kanban' },
    { icon: Edit3, label: 'Editor', path: '/editor' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className={`
      bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 
      transition-all duration-300 ease-in-out
      ${sidebarOpen ? 'w-64' : 'w-16'}
      min-h-screen fixed left-0 top-0 z-40
    `}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Shopmart
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
