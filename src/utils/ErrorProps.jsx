import React from 'react';
import { Package, AlertTriangle } from 'lucide-react';


const Error = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="flex flex-col items-center space-y-6 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center">
            <div className="relative">
              <Package
                className="h-12 w-12 text-blue-500 animate-pulse"
              />
              <div className="absolute inset-0 h-12 w-12 rounded-full bg-blue-500/20 animate-pulse" />
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-700 dark:text-gray-300">
              Ojaflow
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Oops, an error occurred
          </h2>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};


export default Error;