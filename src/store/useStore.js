import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Theme state
      theme: 'light',
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),

      // Color theme state
      colorTheme: 'blue',
      setColorTheme: (color) => set({ colorTheme: color }),

      // Sidebar state
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({
        sidebarOpen: !state.sidebarOpen
      })),
      
      // User data
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        role: 'Admin'
      },
      
      // Ecommerce Dashboard data
      dashboardStats: {
        totalRevenue: 125678,
        totalOrders: 2890,
        totalCustomers: 5234,
        totalProducts: 1456,
        conversionRate: 3.8,
        averageOrderValue: 89.50,
        monthlyGrowth: 12.5,
        returnRate: 2.1
      },

      // Color themes
      colorThemes: {
        blue: {
          primary: '#3b82f6',
          secondary: '#1e40af',
          accent: '#60a5fa',
          gradient: 'from-blue-500 to-blue-600'
        },
        green: {
          primary: '#10b981',
          secondary: '#047857',
          accent: '#34d399',
          gradient: 'from-green-500 to-green-600'
        },
        purple: {
          primary: '#8b5cf6',
          secondary: '#7c3aed',
          accent: '#a78bfa',
          gradient: 'from-purple-500 to-purple-600'
        },
        orange: {
          primary: '#f59e0b',
          secondary: '#d97706',
          accent: '#fbbf24',
          gradient: 'from-orange-500 to-orange-600'
        },
        red: {
          primary: '#ef4444',
          secondary: '#dc2626',
          accent: '#f87171',
          gradient: 'from-red-500 to-red-600'
        },
        pink: {
          primary: '#ec4899',
          secondary: '#db2777',
          accent: '#f472b6',
          gradient: 'from-pink-500 to-pink-600'
        }
      },
      
      // Orders data
      ordersData: [
        { id: 'ORD-001', customer: 'Alice Johnson', email: 'alice@example.com', total: 299.99, status: 'Delivered', date: '2024-06-01', items: 3, payment: 'Credit Card' },
        { id: 'ORD-002', customer: 'Bob Smith', email: 'bob@example.com', total: 149.50, status: 'Processing', date: '2024-06-02', items: 2, payment: 'PayPal' },
        { id: 'ORD-003', customer: 'Carol Davis', email: 'carol@example.com', total: 89.99, status: 'Shipped', date: '2024-06-03', items: 1, payment: 'Credit Card' },
        { id: 'ORD-004', customer: 'David Wilson', email: 'david@example.com', total: 199.99, status: 'Pending', date: '2024-06-04', items: 2, payment: 'Bank Transfer' },
        { id: 'ORD-005', customer: 'Eva Brown', email: 'eva@example.com', total: 349.99, status: 'Delivered', date: '2024-06-05', items: 4, payment: 'Credit Card' },
      ],

      // Customers data
      customersData: [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '+1-555-0101', totalOrders: 12, totalSpent: 2499.99, status: 'VIP', joinDate: '2023-01-15', location: 'New York, USA' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '+1-555-0102', totalOrders: 8, totalSpent: 1299.50, status: 'Regular', joinDate: '2023-02-20', location: 'Los Angeles, USA' },
        { id: 3, name: 'Carol Davis', email: 'carol@example.com', phone: '+1-555-0103', totalOrders: 15, totalSpent: 3199.99, status: 'VIP', joinDate: '2023-03-10', location: 'Chicago, USA' },
        { id: 4, name: 'David Wilson', email: 'david@example.com', phone: '+1-555-0104', totalOrders: 5, totalSpent: 899.99, status: 'Regular', joinDate: '2023-04-05', location: 'Houston, USA' },
        { id: 5, name: 'Eva Brown', email: 'eva@example.com', phone: '+1-555-0105', totalOrders: 20, totalSpent: 4599.99, status: 'VIP', joinDate: '2023-05-12', location: 'Phoenix, USA' },
      ],

      // Employees data
      employeesData: [
        { id: 1, name: 'John Manager', email: 'john@company.com', role: 'Store Manager', department: 'Operations', salary: 75000, status: 'Active', hireDate: '2022-01-15', phone: '+1-555-0201' },
        { id: 2, name: 'Sarah Sales', email: 'sarah@company.com', role: 'Sales Associate', department: 'Sales', salary: 45000, status: 'Active', hireDate: '2022-03-20', phone: '+1-555-0202' },
        { id: 3, name: 'Mike Support', email: 'mike@company.com', role: 'Customer Support', department: 'Support', salary: 40000, status: 'Active', hireDate: '2022-05-10', phone: '+1-555-0203' },
        { id: 4, name: 'Lisa Marketing', email: 'lisa@company.com', role: 'Marketing Specialist', department: 'Marketing', salary: 55000, status: 'Active', hireDate: '2022-07-05', phone: '+1-555-0204' },
        { id: 5, name: 'Tom Warehouse', email: 'tom@company.com', role: 'Warehouse Manager', department: 'Logistics', salary: 50000, status: 'On Leave', hireDate: '2022-09-12', phone: '+1-555-0205' },
      ],

      // Products data
      productsData: [
        { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 150, sold: 89, status: 'Active', sku: 'WH-001', rating: 4.5 },
        { id: 2, name: 'Smart Watch', category: 'Electronics', price: 299.99, stock: 75, sold: 156, status: 'Active', sku: 'SW-002', rating: 4.8 },
        { id: 3, name: 'Running Shoes', category: 'Sports', price: 129.99, stock: 200, sold: 234, status: 'Active', sku: 'RS-003', rating: 4.3 },
        { id: 4, name: 'Coffee Maker', category: 'Home', price: 79.99, stock: 50, sold: 67, status: 'Low Stock', sku: 'CM-004', rating: 4.2 },
        { id: 5, name: 'Laptop Bag', category: 'Accessories', price: 49.99, stock: 0, sold: 123, status: 'Out of Stock', sku: 'LB-005', rating: 4.0 },
      ],
      
      // Calendar events
      calendarEvents: [
        {
          id: 1,
          title: 'Team Meeting',
          start: new Date(2024, 5, 10, 10, 0),
          end: new Date(2024, 5, 10, 11, 0),
          resource: 'meeting'
        },
        {
          id: 2,
          title: 'Project Review',
          start: new Date(2024, 5, 12, 14, 0),
          end: new Date(2024, 5, 12, 15, 30),
          resource: 'review'
        },
        {
          id: 3,
          title: 'Client Call',
          start: new Date(2024, 5, 15, 9, 0),
          end: new Date(2024, 5, 15, 10, 0),
          resource: 'call'
        }
      ],
      
      // Kanban data
      kanbanData: {
        todo: [
          { id: '1', title: 'Design new landing page', description: 'Create wireframes and mockups', priority: 'high', assignee: 'Alice' },
          { id: '2', title: 'Update user documentation', description: 'Review and update API docs', priority: 'medium', assignee: 'Bob' },
        ],
        inProgress: [
          { id: '3', title: 'Implement authentication', description: 'Add OAuth integration', priority: 'high', assignee: 'Carol' },
          { id: '4', title: 'Fix mobile responsiveness', description: 'Resolve layout issues on mobile', priority: 'medium', assignee: 'David' },
        ],
        done: [
          { id: '5', title: 'Setup CI/CD pipeline', description: 'Configure automated deployment', priority: 'low', assignee: 'Eva' },
        ]
      },
      
      // Actions
      addCalendarEvent: (event) => set((state) => ({
        calendarEvents: [...state.calendarEvents, { ...event, id: Date.now() }]
      })),
      
      updateKanbanData: (newData) => set({ kanbanData: newData }),
      
      addTableRow: (row) => set((state) => ({
        tableData: [...state.tableData, { ...row, id: Date.now() }]
      })),
      
      updateTableRow: (id, updatedRow) => set((state) => ({
        tableData: state.tableData.map(row => 
          row.id === id ? { ...row, ...updatedRow } : row
        )
      })),
      
      deleteTableRow: (id) => set((state) => ({
        tableData: state.tableData.filter(row => row.id !== id)
      })),
    }),
    {
      name: 'admin-dashboard-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        user: state.user,
      }),
    }
  )
);

export default useStore;
