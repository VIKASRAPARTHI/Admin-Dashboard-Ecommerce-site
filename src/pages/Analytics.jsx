import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Calendar, Download, Filter } from 'lucide-react';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const revenueData = [
    { name: 'Jan', revenue: 4000, profit: 2400, expenses: 1600 },
    { name: 'Feb', revenue: 3000, profit: 1398, expenses: 1602 },
    { name: 'Mar', revenue: 2000, profit: 800, expenses: 1200 },
    { name: 'Apr', revenue: 2780, profit: 3908, expenses: -1128 },
    { name: 'May', revenue: 1890, profit: 4800, expenses: -2910 },
    { name: 'Jun', revenue: 2390, profit: 3800, expenses: -1410 },
    { name: 'Jul', revenue: 3490, profit: 4300, expenses: -810 },
  ];

  const userGrowthData = [
    { name: 'Week 1', users: 1000, newUsers: 120, activeUsers: 800 },
    { name: 'Week 2', users: 1120, newUsers: 150, activeUsers: 900 },
    { name: 'Week 3', users: 1270, newUsers: 180, activeUsers: 1050 },
    { name: 'Week 4', users: 1450, newUsers: 200, activeUsers: 1200 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#3b82f6' },
    { name: 'Mobile', value: 35, color: '#10b981' },
    { name: 'Tablet', value: 20, color: '#f59e0b' },
  ];

  const performanceData = [
    { subject: 'Speed', A: 120, B: 110, fullMark: 150 },
    { subject: 'Reliability', A: 98, B: 130, fullMark: 150 },
    { subject: 'Security', A: 86, B: 130, fullMark: 150 },
    { subject: 'Usability', A: 99, B: 100, fullMark: 150 },
    { subject: 'Features', A: 85, B: 90, fullMark: 150 },
    { subject: 'Support', A: 65, B: 85, fullMark: 150 },
  ];

  const trafficSourceData = [
    { name: 'Organic Search', sessions: 4500, bounceRate: 32 },
    { name: 'Direct', sessions: 3200, bounceRate: 28 },
    { name: 'Social Media', sessions: 2100, bounceRate: 45 },
    { name: 'Email', sessions: 1800, bounceRate: 22 },
    { name: 'Paid Ads', sessions: 1200, bounceRate: 38 },
  ];

  const exportData = () => {
    // Simple CSV export functionality
    const csvData = revenueData.map(item => 
      `${item.name},${item.revenue},${item.profit},${item.expenses}`
    ).join('\n');
    
    const blob = new Blob([`Month,Revenue,Profit,Expenses\n${csvData}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive insights into your business performance</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={exportData}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$45,678', change: '+12%', color: 'text-green-600' },
          { label: 'Active Users', value: '12,345', change: '+8%', color: 'text-green-600' },
          { label: 'Conversion Rate', value: '3.2%', change: '-2%', color: 'text-red-600' },
          { label: 'Avg. Session', value: '4m 32s', change: '+15%', color: 'text-green-600' },
        ].map((metric, index) => (
          <div key={index} className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
            <p className={`text-sm ${metric.color}`}>{metric.change} from last period</p>
          </div>
        ))}
      </div>

      {/* Revenue & Profit Chart */}
      <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue & Profit Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={revenueData}>
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
            <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="profit" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
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
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="newUsers" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="activeUsers" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Device Usage */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Device Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Radar */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Radar name="Current" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Radar name="Target" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trafficSourceData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="name" type="category" stroke="#6b7280" width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="sessions" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detailed Analytics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sessions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Bounce Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Conversion
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
              {trafficSourceData.map((source, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-dark-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {source.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {source.sessions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {source.bounceRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {(Math.random() * 5 + 1).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
