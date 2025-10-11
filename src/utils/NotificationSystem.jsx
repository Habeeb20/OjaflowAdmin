/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type, duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] space-y-4">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

const Notification = ({ message, type, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: 'notification-success',
    error: 'notification-error',
    warning: 'notification-warning',
    info: 'notification-info',
  };

  const iconStyles = {
    success: 'text-success-600 dark:text-success-400',
    error: 'text-error-600 dark:text-error-400',
    warning: 'text-warning-600 dark:text-warning-400',
    info: 'text-info-600 dark:text-info-400',
  };

  const progressBarStyles = {
    success: 'bg-success-500',
    error: 'bg-error-500',
    warning: 'bg-warning-500',
    info: 'bg-info-500',
  };

  const icons = {
    success: <CheckCircle className={`h-5 w-5 ${iconStyles.success}`} />,
    error: <AlertCircle className={`h-5 w-5 ${iconStyles.error}`} />,
    warning: <AlertTriangle className={`h-5 w-5 ${iconStyles.warning}`} />,
    info: <Info className={`h-5 w-5 ${iconStyles.info}`} />,
  };

  return (
    <div
      className={`notification font-sans ${typeStyles[type]} backdrop-blur-xs transition-all duration-400 ease-smooth animate-slide-in`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground dark:text-foreground-dark">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 text-foreground-secondary dark:text-foreground-secondary-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden rounded-b-lg">
        <div
          className={`h-full ${progressBarStyles[type]} animate-progress`}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};