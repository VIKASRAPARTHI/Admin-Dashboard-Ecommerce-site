import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeProvider from './components/ThemeProvider';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Employees from './pages/Employees';
import Products from './pages/Products';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';
import Kanban from './pages/Kanban';
import Editor from './pages/Editor';

import Settings from './pages/Settings';



function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="employees" element={<Employees />} />
            <Route path="products" element={<Products />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="kanban" element={<Kanban />} />
            <Route path="editor" element={<Editor />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
