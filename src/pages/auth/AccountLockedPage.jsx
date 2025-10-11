import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Lock, Clock, Mail, AlertTriangle } from "lucide-react";

const AccountLockedPage = () => {
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [showContactSupport, setShowContactSupport] = useState(false);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleContactSupport = () => {
    setShowContactSupport(true);
  };

  if (showContactSupport) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-background-dark dark:via-neutral-900 dark:to-primary-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-background-card/80 dark:bg-background-card-dark/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-border/20 dark:border-border-dark/30">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-info-500 to-info-600 rounded-xl mb-6 shadow-glow">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground dark:text-foreground-dark mb-3">
                Contact Support
              </h1>
              <p className="text-foreground-secondary dark:text-foreground-secondary-dark mb-6">
                If you believe your account was locked in error, please contact our support team.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-background-muted/50 dark:bg-neutral-800/50 rounded-lg border border-border dark:border-border-dark">
                  <h3 className="font-semibold text-foreground dark:text-foreground-dark mb-2">Email Support</h3>
                  <p className="text-sm text-foreground-secondary dark:text-foreground-secondary-dark">
                    support@ojaflow.com
                  </p>
                </div>
                
                <div className="p-4 bg-background-muted/50 dark:bg-neutral-800/50 rounded-lg border border-border dark:border-border-dark">
                  <h3 className="font-semibold text-foreground dark:text-foreground-dark mb-2">Phone Support</h3>
                  <p className="text-sm text-foreground-secondary dark:text-foreground-secondary-dark">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-xs text-foreground-muted dark:text-foreground-muted-dark mt-1">
                    Available 24/7
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowContactSupport(false)}
                  className="inventory-button-secondary w-full"
                >
                  Back
                </button>
                
                <Link to="/login" className="block text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200">
                  Return to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-background-dark dark:via-neutral-900 dark:to-primary-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-background-card/80 dark:bg-background-card-dark/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-border/20 dark:border-border-dark/30">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-error-500 to-error-600 rounded-xl mb-6 shadow-glow">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground dark:text-foreground-dark mb-3">
              Account Temporarily Locked
            </h1>
            <p className="text-foreground-secondary dark:text-foreground-secondary-dark text-sm">
              Your account has been locked due to multiple failed login attempts
            </p>
          </div>

          {/* Security Info */}
          <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700/30 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-warning-600 dark:text-warning-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-warning-800 dark:text-warning-200 mb-2">
                  Security Protection Active
                </h3>
                <p className="text-sm text-warning-700 dark:text-warning-300">
                  This is a security measure to protect your account from unauthorized access attempts.
                </p>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          {timeRemaining > 0 ? (
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center space-x-2 text-primary-600 dark:text-primary-400 mb-4">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Automatic Unlock In:</span>
              </div>
              <div className="text-4xl font-bold text-foreground dark:text-foreground-dark mb-2">
                {formatTime(timeRemaining)}
              </div>
              <p className="text-sm text-foreground-muted dark:text-foreground-muted-dark">
                Your account will be automatically unlocked
              </p>
            </div>
          ) : (
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl mb-4">
                <Lock className="w-6 h-6 text-white transform rotate-0" />
              </div>
              <h3 className="text-xl font-bold text-success-600 dark:text-success-400 mb-2">
                Account Unlocked!
              </h3>
              <p className="text-sm text-foreground-secondary dark:text-foreground-secondary-dark">
                You can now try logging in again
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            {timeRemaining === 0 ? (
              <Link
                to="/login"
                className="w-full inventory-button-primary text-center block"
              >
                Try Login Again
              </Link>
            ) : (
              <button
                disabled
                className="w-full inventory-button-primary opacity-50 cursor-not-allowed"
              >
                Login Temporarily Disabled
              </button>
            )}

            <button
              onClick={handleContactSupport}
              className="w-full inventory-button-secondary"
            >
              Contact Support
            </button>
          </div>

          {/* Security Tips */}
          <div className="mt-8 pt-6 border-t border-border dark:border-border-dark">
            <h4 className="font-semibold text-foreground dark:text-foreground-dark mb-3 text-center">
              Security Tips
            </h4>
            <ul className="space-y-2 text-sm text-foreground-secondary dark:text-foreground-secondary-dark">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                Use a strong, unique password
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                Enable two-factor authentication
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                Don't share your login credentials
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <Link
              to="/"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200 text-sm"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLockedPage;