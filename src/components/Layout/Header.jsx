import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Bell, Sun, Moon, User, ShoppingCart, Settings, Palette, Check, X } from 'lucide-react';
import useStore from '../../store/useStore';

const Header = () => {
  const { theme, toggleTheme, sidebarOpen, toggleSidebar, user, colorTheme, setColorTheme, colorThemes } = useStore();
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const themeRef = useRef(null);
  const notificationsRef = useRef(null);
  const cartRef = useRef(null);

  const currentTheme = colorThemes[colorTheme];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setShowThemeDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [
    { id: 1, title: 'New Order #1234', message: 'Order received from John Doe', time: '2 min ago', type: 'order', unread: true },
    { id: 2, title: 'Low Stock Alert', message: 'Wireless Headphones - Only 5 left', time: '15 min ago', type: 'warning', unread: true },
    { id: 3, title: 'Customer Review', message: 'New 5-star review on Smart Watch', time: '1 hour ago', type: 'review', unread: false },
    { id: 4, title: 'Payment Received', message: '$299.99 payment confirmed', time: '2 hours ago', type: 'payment', unread: false },
    { id: 5, title: 'New Customer', message: 'Sarah Johnson registered', time: '3 hours ago', type: 'user', unread: false },
  ];

  const cartItems = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 2, image: '🎧' },
    { id: 2, name: 'Smart Watch', price: 299.99, quantity: 1, image: '⌚' },
    { id: 3, name: 'Laptop Bag', price: 49.99, quantity: 1, image: '💼' },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleColorThemeChange = (newTheme) => {
    setColorTheme(newTheme);
    setShowThemeDropdown(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return '📦';
      case 'warning': return '⚠️';
      case 'review': return '⭐';
      case 'payment': return '💰';
      case 'user': return '👤';
      default: return '📢';
    }
  };

  return (
    <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 px-4 py-3 flex items-center justify-between relative z-50">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-80"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-2">
        {/* Cart Button */}
        <div className="relative" ref={cartRef}>
          <button
            onClick={() => setShowCart(!showCart)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Cart Dropdown */}
          {showCart && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg shadow-lg">
              <div className="p-4 border-b border-gray-200 dark:border-dark-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Shopping Cart</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="p-3 border-b border-gray-100 dark:border-dark-700 flex items-center space-x-3">
                    <span className="text-2xl">{item.image}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">${item.price}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-dark-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-900 dark:text-white">Total: ${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  className="w-full py-2 text-white rounded-lg transition-colors"
                  style={{ backgroundColor: currentTheme.primary }}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors relative"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg shadow-lg">
              <div className="p-4 border-b border-gray-200 dark:border-dark-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map(notification => (
                  <div key={notification.id} className={`p-3 border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700 ${notification.unread ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                    <div className="flex items-start space-x-3">
                      <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-dark-700">
                <button className="w-full text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Settings */}
        <div className="relative" ref={themeRef}>
          <button
            onClick={() => setShowThemeDropdown(!showThemeDropdown)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Theme Settings Dropdown */}
          {showThemeDropdown && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg shadow-lg">
              <div className="p-4 border-b border-gray-200 dark:border-dark-700">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Theme Settings
                </h3>
              </div>

              {/* Theme Mode */}
              <div className="p-4 border-b border-gray-200 dark:border-dark-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Theme Mode</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      if (theme === 'dark') toggleTheme();
                      setShowThemeDropdown(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                      theme === 'light' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-dark-700'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span className="text-sm">Light</span>
                    {theme === 'light' && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                  <button
                    onClick={() => {
                      if (theme === 'light') toggleTheme();
                      setShowThemeDropdown(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                      theme === 'dark' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-dark-700'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    <span className="text-sm">Dark</span>
                    {theme === 'dark' && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                </div>
              </div>

              {/* Theme Colors */}
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <Palette className="w-4 h-4 mr-2" />
                  Theme Colors
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(colorThemes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => handleColorThemeChange(key)}
                      className={`p-2 rounded-lg border-2 transition-colors ${
                        colorTheme === key ? 'border-gray-400 dark:border-gray-500' : 'border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500'
                      }`}
                    >
                      <div className="flex items-center space-x-1">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.accent }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 capitalize">{key}</p>
                      {colorTheme === key && (
                        <Check className="w-3 h-3 mx-auto mt-1 text-green-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="flex items-center space-x-3 ml-2">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
          </div>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
