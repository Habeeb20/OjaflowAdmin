
import React from 'react';
import { Package } from 'lucide-react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center">
            <div className="relative">
              <Package
                className="h-12 w-12 text-blue-500 animate-spin-slow"
                style={{
                  animation: 'spin 2s linear infinite',
                }}
              />
              <div className="absolute inset-0 h-12 w-12 rounded-full bg-blue-500/20 animate-pulse" />
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-700 dark:text-gray-300 animate-pulse">
              Ojaflow
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          Loading your experience...
        </p>
      </div>
    </div>
  );
};


export default Loading;
