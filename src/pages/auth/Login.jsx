/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Package, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useNotification } from '../../utils/NotificationSystem';
import Loading from '../../utils/Loading';
import Error from '../../utils/ErrorProps';
import { setAuth } from '../../store/slices/authSlice';
import { AlertCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [networkError, setNetworkError] = useState(null);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setNetworkError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          remember: rememberMe,
        }),
      });

      const result = await response.json();
const token = result.token
localStorage.setItem("token", token)
      if (response.ok ) {
        dispatch(
          setAuth({
            token: result.token,
            user: result.user || { id: '1', name: formData.email, role: 'User' },
          }),
        );
        addNotification('Logged in successfully!', 'success');
        navigate('/dashboard');
      } else {
        setErrors({ general: result.message || 'Invalid credentials' });
        addNotification(result.message || 'Invalid credentials', 'error');
      }
    } catch (error) {
      setNetworkError('Network error. Please check your connection and try again.');
      addNotification('Network error. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setNetworkError(null);
    handleSubmit({ preventDefault: () => {} });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (networkError) {
    return <Error message={networkError} onRetry={handleRetry} />;
  }

  return (
    <>
    <Navbar/>
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 transition-all duration-400">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-lg p-8">
        {/* Header with Ojaflow Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <Package className="h-12 w-12 text-blue-500 animate-pulse" />
              <div className="absolute inset-0 h-12 w-12 rounded-full bg-blue-500/20 animate-pulse" />
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Ojaflow
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Sign In
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Access your inventory management dashboard
          </p>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" />
            <span className="text-sm font-medium text-red-800 dark:text-red-200">
              {errors.general}
            </span>
          </div>
        )}

        {/* Form */}
        <div className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* <Mail className="h-5 w-5 text-gray-400" /> */}
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="Enter your email"
                className={`w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : ''
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* <Lock className="h-5 w-5 text-gray-400" /> */}
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="Enter your password"
                className={`w-full px-3 py-2 pl-10 pr-12 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : ''
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-600 dark:text-gray-400"
              >
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-200"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all duration-200 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loading />
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 mr-3" />
                Sign In
              </>
            )}
          </button>
        </div>

        {/* Demo Credentials */}
        {/* <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2 text-center">
            Demo Account
          </p>
          <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1 text-center">
            <p><strong>Email:</strong> admin@demo.com</p>
            <p><strong>Password:</strong> password123</p>
          </div>
        </div> */}

        {/* Sign Up Link */}
        <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default Login;