import React from 'react';
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import useStore from '../store/useStore';

const Dashboard = () => {
  const { dashboardStats, colorTheme, colorThemes } = useStore();
  const currentTheme = colorThemes[colorTheme];

  const lineChartData = [
    { name: 'Jan', revenue: 4000, users: 240 },
    { name: 'Feb', revenue: 3000, users: 139 },
    { name: 'Mar', revenue: 2000, users: 980 },
    { name: 'Apr', revenue: 2780, users: 390 },
    { name: 'May', revenue: 1890, users: 480 },
    { name: 'Jun', revenue: 2390, users: 380 },
  ];

  const barChartData = [
    { name: 'Mon', orders: 20 },
    { name: 'Tue', orders: 35 },
    { name: 'Wed', orders: 25 },
    { name: 'Thu', orders: 40 },
    { name: 'Fri', orders: 55 },
    { name: 'Sat', orders: 30 },
    { name: 'Sun', orders: 15 },
  ];

  const pieChartData = [
    { name: 'Desktop', value: 45, color: '#3b82f6' },
    { name: 'Mobile', value: 35, color: '#10b981' },
    { name: 'Tablet', value: 20, color: '#f59e0b' },
  ];

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}% from last month
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ecommerce Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your store performance overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
          change={dashboardStats.monthlyGrowth}
          color="bg-green-500"
        />
        <StatCard
          icon={ShoppingCart}
          title="Total Orders"
          value={dashboardStats.totalOrders.toLocaleString()}
          change={8.2}
          color="bg-blue-500"
        />
        <StatCard
          icon={Users}
          title="Customers"
          value={dashboardStats.totalCustomers.toLocaleString()}
          change={15.3}
          color="bg-purple-500"
        />
        <StatCard
          icon={TrendingUp}
          title="Avg Order Value"
          value={`$${dashboardStats.averageOrderValue}`}
          change={5.7}
          color="bg-orange-500"
        />
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalProducts}</p>
              <p className="text-sm text-blue-600">Active inventory</p>
            </div>
            <div className="p-3 rounded-full bg-indigo-500">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.conversionRate}%</p>
              <p className="text-sm text-green-600">+0.5% from last month</p>
            </div>
            <div className="p-3 rounded-full bg-teal-500">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Return Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.returnRate}%</p>
              <p className="text-sm text-red-600">-0.3% from last month</p>
            </div>
            <div className="p-3 rounded-full bg-red-500">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue & Users Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="orders" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { user: 'Alice Johnson', action: 'created a new project', time: '2 minutes ago' },
              { user: 'Bob Smith', action: 'updated user profile', time: '5 minutes ago' },
              { user: 'Carol Davis', action: 'completed task #123', time: '10 minutes ago' },
              { user: 'David Wilson', action: 'left a comment', time: '15 minutes ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{activity.user[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
