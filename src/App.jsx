/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useNotification } from './utils/NotificationSystem';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import Home from './pages/Home';

import Login from './pages/auth/Login';
import Register from './pages/auth/Signup';
import AdminDashboard from './pages/Dashboard/Dashboard';

const App = () => {
  const [theme, setTheme] = useState('light');
  const { addNotification } = useNotification();
  const location = useLocation();

  // Routes where navbar and footer should be hidden
  const hideLayoutRoutes = [
    '/business/dashboard',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/2fa',
    '/account-locked',
  ];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleNavigation = (section) => {
    console.log(`Navigating to ${section}`);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      {!shouldHideLayout && (
        <Navbar
          isAuthenticated={false}
          currentTheme={theme}
          onThemeToggle={handleThemeToggle}
          onLogin={() => console.log('Login clicked')}
          onDashboard={() => console.log('Dashboard clicked')}
        />
      )}
      <main className="flex-1">
        <Routes>
       
          <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* {!shouldHideLayout && <Footer onNavigate={handleNavigation} />} */}
    </div>
  );
};

export default App;