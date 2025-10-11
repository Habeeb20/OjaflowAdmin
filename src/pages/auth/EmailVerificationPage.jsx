import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Mail, CheckCircle, XCircle, RefreshCw, Send } from "lucide-react";

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (token) {
      // Simulate email verification
      const timer = setTimeout(() => {
        // Random success/error for demo
        const success = Math.random() > 0.3;
        setVerificationStatus(success ? "success" : "error");
        if (success) {
          setTimeout(() => navigate("/login"), 3000);
        }
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setVerificationStatus("resend");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (verificationStatus === "resend" && !canResend) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [verificationStatus, canResend]);

  const handleResendVerification = async () => {
    setIsResending(true);
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setCanResend(false);
      setCountdown(60);
    }, 2000);
  };

  // Verifying state
  if (verificationStatus === "verifying") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-background-dark dark:via-neutral-900 dark:to-primary-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-background-card/80 dark:bg-background-card-dark/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-border/20 dark:border-border-dark/30">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl mb-6 shadow-glow">
                <RefreshCw className="w-8 h-8 text-white animate-spin" />
              </div>
              <h1 className="text-3xl font-bold text-foreground dark:text-foreground-dark mb-3">
                Verifying Email
              </h1>
              <p className="text-foreground-secondary dark:text-foreground-secondary-dark">
                Please wait while we verify your email address...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (verificationStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-background-dark dark:via-neutral-900 dark:to-primary-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-background-card/80 dark:bg-background-card-dark/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-border/20 dark:border-border-dark/30">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-xl mb-6 shadow-glow">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground dark:text-foreground-dark mb-3">
                Email Verified!
              </h1>
              <p className="text-foreground-secondary dark:text-foreground-secondary-dark mb-6">
                Your email has been successfully verified. You can now access
                your account.
              </p>
              <p className="text-sm text-foreground-muted dark:text-foreground-muted-dark mb-8">
                Redirecting to login page in 3 seconds...
              </p>
              <Link to="/login" className="inventory-button-primary">
                Sign In Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (verificationStatus === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-background-dark dark:via-neutral-900 dark:to-primary-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-background-card/80 dark:bg-background-card-dark/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-border/20 dark:border-border-dark/30">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-error-500 to-error-600 rounded-xl mb-6">
                <XCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground dark:text-foreground-dark mb-3">
                Verification Failed
              </h1>
              <p className="text-foreground-secondary dark:text-foreground-secondary-dark mb-6">
                This verification link is invalid or has expired.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => setVerificationStatus("resend")}
                  className="inventory-button-primary"
                >
                  Request New Link
                </button>
                <Link
                  to="/login"
                  className="block text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Resend verification state
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-background-dark dark:via-neutral-900 dark:to-primary-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-background-card/80 dark:bg-background-card-dark/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-border/20 dark:border-border-dark/30">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-info-500 to-info-600 rounded-xl mb-6 shadow-glow">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground dark:text-foreground-dark mb-3">
              Verify Your Email
            </h1>
            <p className="text-foreground-secondary dark:text-foreground-secondary-dark mb-6">
              {email
                ? `We've sent a verification link to ${email}`
                : "Check your email for a verification link"}
            </p>
            <p className="text-sm text-foreground-muted dark:text-foreground-muted-dark mb-8">
              Didn't receive the email? Check your spam folder or request a new
              one.
            </p>

            <div className="space-y-4">
              <button
                onClick={handleResendVerification}
                disabled={!canResend || isResending}
                className="w-full inventory-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : canResend ? (
                  <div className="flex items-center justify-center">
                    <Send className="w-4 h-4 mr-2" />
                    Resend Verification
                  </div>
                ) : (
                  `Resend in ${countdown}s`
                )}
              </button>

              <Link
                to="/login"
                className="block text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;