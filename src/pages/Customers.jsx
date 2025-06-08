import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Star, MapPin, Phone, Mail, DollarSign } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

const Customers = () => {
  const { customersData, colorTheme, colorThemes } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const itemsPerPage = 8;

  const currentTheme = colorThemes[colorTheme];

  // Filter and sort data
  const filteredData = customersData
    .filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || customer.status.toLowerCase() === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'vip':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'regular':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const CustomerCard = ({ customer }) => (
    <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: currentTheme.primary }}
          >
            {customer.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{customer.name}</h3>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
              {customer.status === 'VIP' && <Star className="w-3 h-3 mr-1" />}
              {customer.status}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">
            <Edit className="w-4 h-4" />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4" />
          <span>{customer.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4" />
          <span>{customer.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>{customer.location}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Total Orders</p>
            <p className="font-semibold text-gray-900 dark:text-white">{customer.totalOrders}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Total Spent</p>
            <p className="font-semibold text-gray-900 dark:text-white">${customer.totalSpent}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your customer relationships</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          style={{ backgroundColor: currentTheme.primary }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            label: 'Total Customers', 
            value: customersData.length, 
            icon: '👥',
            color: 'bg-blue-500'
          },
          { 
            label: 'VIP Customers', 
            value: customersData.filter(c => c.status === 'VIP').length, 
            icon: '⭐',
            color: 'bg-purple-500'
          },
          { 
            label: 'Avg. Order Value', 
            value: `$${(customersData.reduce((sum, c) => sum + c.totalSpent, 0) / customersData.reduce((sum, c) => sum + c.totalOrders, 0)).toFixed(2)}`, 
            icon: '💰',
            color: 'bg-green-500'
          },
          { 
            label: 'Total Revenue', 
            value: `$${customersData.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}`, 
            icon: '📈',
            color: 'bg-orange-500'
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Customers</option>
              <option value="vip">VIP</option>
              <option value="regular">Regular</option>
            </select>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="name">Sort by Name</option>
              <option value="totalSpent">Sort by Spending</option>
              <option value="totalOrders">Sort by Orders</option>
              <option value="joinDate">Sort by Join Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedData.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white dark:bg-dark-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} customers
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add New Customer</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700"
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700"
              />
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700">
                <option value="Regular">Regular</option>
                <option value="VIP">VIP</option>
              </select>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 btn-primary text-white py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: currentTheme.primary }}
                >
                  Add Customer
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
