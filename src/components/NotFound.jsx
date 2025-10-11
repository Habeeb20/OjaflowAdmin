import React, { useState, useEffect } from "react";
import { Home, Search, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = () => {
      setMousePosition({
   
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-background-dark dark:via-neutral-900 dark:to-primary-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary-400/20 rounded-full animate-bounce-in`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div
        className={`max-w-2xl mx-auto text-center space-y-8 relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* 404 Number with Glow Effect */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-black text-primary-500/20 dark:text-primary-400/20 select-none leading-none">
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-black bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent animate-pulse-soft leading-none">
            404
          </div>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-primary-500 blur-xl opacity-20 animate-glow leading-none">
            404
          </div>
        </div>

        {/* Error Icon */}
        <div
          className="flex justify-center animate-bounce-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative">
            <AlertCircle className="w-16 h-16 text-primary-500 animate-pulse" />
            <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-lg animate-pulse" />
          </div>
        </div>

        {/* Main Message */}
        <div
          className="space-y-4 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground-secondary dark:from-foreground-dark dark:to-foreground-secondary-dark bg-clip-text text-transparent">
            Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-foreground-secondary dark:text-foreground-secondary-dark max-w-lg mx-auto leading-relaxed">
            Oops! The page you're looking for seems to have wandered off into
            the digital void. Don't worry, it happens to the best of us.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in"
          style={{ animationDelay: "0.6s" }}
        >
          <button
            onClick={handleGoHome}
            className="inventory-button-primary group flex items-center gap-2 px-6 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Home className="w-5 h-5 group-hover:animate-bounce" />
            Go Home
          </button>

          <button
            onClick={handleGoBack}
            className="inventory-button-secondary group flex items-center gap-2 px-6 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            Go Back
          </button>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-6 py-3 text-lg font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 group"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
            Refresh
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="bg-white/80 dark:bg-background-card-dark/80 backdrop-blur-sm rounded-2xl p-6 shadow-card border border-border/50 dark:border-border-dark/50">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Search className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-foreground dark:text-foreground-dark">
                What were you looking for?
              </h3>
            </div>
            <p className="text-sm text-foreground-secondary dark:text-foreground-secondary-dark mb-4">
              Try searching for what you need or explore our main sections
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Dashboard", "Products", "Reports", "Settings", "Help"].map(
                (item, index) => (
                  <button
                    key={item}
                    className="px-3 py-1.5 text-sm bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors duration-200 transform hover:scale-105"
                    style={{ animationDelay: `${1 + index * 0.1}s` }}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Fun Footer Message */}
        <div className="animate-fade-in" style={{ animationDelay: "1s" }}>
          <p className="text-sm text-foreground-muted dark:text-foreground-muted-dark">
            Lost? Don't panic! Even the best explorers take wrong turns
            sometimes. 🧭
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-secondary-400/20 to-primary-400/20 rounded-full blur-xl animate-spin-slow" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-2xl animate-pulse-soft" />
    </div>
  );
};

export default NotFound;
