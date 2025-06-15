import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Phone, Mail, DollarSign, Calendar, Building } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

const Employees = () => {
  const { employeesData, colorTheme, colorThemes } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const itemsPerPage = 8;

  const currentTheme = colorThemes[colorTheme];

  // Get unique departments
  const departments = [...new Set(employeesData.map(emp => emp.department))];

  // Filter and sort data
  const filteredData = employeesData
    .filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
      const matchesStatus = filterStatus === 'all' || employee.status.toLowerCase() === filterStatus.toLowerCase();
      return matchesSearch && matchesDepartment && matchesStatus;
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
      case 'on leave':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'Operations': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Sales': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Support': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Marketing': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Logistics': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    };
    return colors[department] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const EmployeeCard = ({ employee }) => (
    <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: currentTheme.primary }}
          >
            {employee.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{employee.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{employee.role}</p>
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

      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4" />
          <span>{employee.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4" />
          <span>{employee.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Building className="w-4 h-4" />
          <span>{employee.department}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4" />
          <span>${employee.salary.toLocaleString()}/year</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Hired: {employee.hireDate}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDepartmentColor(employee.department)}`}>
          {employee.department}
        </span>
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
          {employee.status}
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employees</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your team and workforce</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'cards' 
                  ? 'bg-white dark:bg-dark-800 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'table' 
                  ? 'bg-white dark:bg-dark-800 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Table
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            style={{ backgroundColor: currentTheme.primary }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 my-4">
        <div className="flex items-center bg-white dark:bg-dark-800 rounded-xl shadow p-4 space-x-3 border border-gray-100 dark:border-dark-700">
          <span className="text-3xl">👥</span>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">Total Employees</div>
            <div className="text-2xl text-blue-600 dark:text-blue-400">{employeesData.length}</div>
          </div>
        </div>
        <div className="flex items-center bg-white dark:bg-dark-800 rounded-xl shadow p-4 space-x-3 border border-gray-100 dark:border-dark-700">
          <span className="text-3xl">✅</span>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">Active</div>
            <div className="text-2xl text-green-600 dark:text-green-400">{employeesData.filter(e => e.status === 'Active').length}</div>
          </div>
        </div>
        <div className="flex items-center bg-white dark:bg-dark-800 rounded-xl shadow p-4 space-x-3 border border-gray-100 dark:border-dark-700">
          <span className="text-3xl">🏖️</span>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">On Leave</div>
            <div className="text-2xl text-yellow-600 dark:text-yellow-400">{employeesData.filter(e => e.status === 'On Leave').length}</div>
          </div>
        </div>
        <div className="flex items-center bg-white dark:bg-dark-800 rounded-xl shadow p-4 space-x-3 border border-gray-100 dark:border-dark-700">
          <span className="text-3xl">🏢</span>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">Departments</div>
            <div className="text-2xl text-purple-600 dark:text-purple-400">{departments.length}</div>
          </div>
        </div>
        <div className="flex items-center bg-white dark:bg-dark-800 rounded-xl shadow p-4 space-x-3 border border-gray-100 dark:border-dark-700">
          <span className="text-3xl">💰</span>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">Avg. Salary</div>
            <div className="text-2xl text-orange-600 dark:text-orange-400">
              ${Math.round(employeesData.reduce((sum, e) => sum + e.salary, 0) / employeesData.length).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
              />
            </div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="on leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employee Cards/Table */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedData.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-700">
                <tr>
                  {[
                    { key: 'name', label: 'Name' },
                    { key: 'role', label: 'Role' },
                    { key: 'department', label: 'Department' },
                    { key: 'salary', label: 'Salary' },
                    { key: 'status', label: 'Status' },
                    { key: 'hireDate', label: 'Hire Date' },
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
                {paginatedData.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-dark-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3"
                          style={{ backgroundColor: currentTheme.primary }}
                        >
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{employee.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {employee.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDepartmentColor(employee.department)}`}>
                        {employee.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${employee.salary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {employee.hireDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
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
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} employees
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

export default Employees;
