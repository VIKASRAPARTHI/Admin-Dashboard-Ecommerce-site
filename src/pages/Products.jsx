import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Package, Star, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

const Products = () => {
  const { productsData, colorTheme, colorThemes } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const itemsPerPage = 12;

  const currentTheme = colorThemes[colorTheme];

  // Get unique categories
  const categories = [...new Set(productsData.map(product => product.category))];

  // Filter and sort data
  const filteredData = productsData
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || product.status.toLowerCase() === filterStatus.toLowerCase();
      return matchesSearch && matchesCategory && matchesStatus;
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
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'low stock':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'out of stock':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'low stock':
        return <AlertTriangle className="w-4 h-4" />;
      case 'out of stock':
        return <Package className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Electronics': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Sports': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Home': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Accessories': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 hover:shadow-md transition-shadow overflow-hidden">
      {/* Product Image Placeholder */}
      <div 
        className="h-48 flex items-center justify-center text-white text-4xl font-bold"
        style={{ backgroundColor: currentTheme.primary + '20' }}
      >
        <Package className="w-16 h-16" style={{ color: currentTheme.primary }} />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{product.name}</h3>
          <div className="flex space-x-1">
            <button className="text-blue-600 hover:text-blue-800">
              <Eye className="w-4 h-4" />
            </button>
            <button className="text-green-600 hover:text-green-800">
              <Edit className="w-4 h-4" />
            </button>
            <button className="text-red-600 hover:text-red-800">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">SKU:</span>
            <span className="font-medium text-gray-900 dark:text-white">{product.sku}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Price:</span>
            <span className="font-bold text-lg" style={{ color: currentTheme.primary }}>${product.price}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Stock:</span>
            <span className="font-medium text-gray-900 dark:text-white">{product.stock}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Sold:</span>
            <span className="font-medium text-gray-900 dark:text-white">{product.sold}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(product.category)}`}>
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
            {getStatusIcon(product.status)}
            <span className="ml-1">{product.status}</span>
          </span>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {Math.round((product.sold / (product.sold + product.stock)) * 100)}% sold
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your product inventory</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-dark-800 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-dark-800 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              List
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            style={{ backgroundColor: currentTheme.primary }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          { 
            label: 'Total Products', 
            value: productsData.length, 
            icon: '📦',
            color: 'bg-blue-500'
          },
          { 
            label: 'Active', 
            value: productsData.filter(p => p.status === 'Active').length, 
            icon: '✅',
            color: 'bg-green-500'
          },
          { 
            label: 'Low Stock', 
            value: productsData.filter(p => p.status === 'Low Stock').length, 
            icon: '⚠️',
            color: 'bg-yellow-500'
          },
          { 
            label: 'Out of Stock', 
            value: productsData.filter(p => p.status === 'Out of Stock').length, 
            icon: '❌',
            color: 'bg-red-500'
          },
          { 
            label: 'Categories', 
            value: categories.length, 
            icon: '🏷️',
            color: 'bg-purple-500'
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
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="low stock">Low Stock</option>
              <option value="out of stock">Out of Stock</option>
            </select>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
              <option value="sold">Sort by Sales</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-700">
                <tr>
                  {[
                    { key: 'name', label: 'Product' },
                    { key: 'category', label: 'Category' },
                    { key: 'price', label: 'Price' },
                    { key: 'stock', label: 'Stock' },
                    { key: 'sold', label: 'Sold' },
                    { key: 'rating', label: 'Rating' },
                    { key: 'status', label: 'Status' },
                  ].map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-600"
                    >
                      {column.label}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                {paginatedData.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-dark-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-10 h-10 rounded flex items-center justify-center mr-3"
                          style={{ backgroundColor: currentTheme.primary + '20' }}
                        >
                          <Package className="w-5 h-5" style={{ color: currentTheme.primary }} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(product.category)}`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {product.sold}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm text-gray-900 dark:text-white">{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                        {getStatusIcon(product.status)}
                        <span className="ml-1">{product.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="bg-white dark:bg-dark-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} products
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
    </div>
  );
};

export default Products;
