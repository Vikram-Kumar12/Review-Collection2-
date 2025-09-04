import React, { useState, useEffect } from "react";

const Loader = ({
  variant = "modern",
  size = "medium",
  text = "Loading...",
}) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Size classes
  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-20 h-20",
    large: "w-32 h-32",
  };

  // Text size classes
  const textSizeClasses = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };

  // Modern variant
  const ModernLoader = () => (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 dark:border-gray-800`}
      ></div>
      <div
        className={`${sizeClasses[size]} absolute top-0 left-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin`}
      ></div>
      <div
        className={`${sizeClasses[size]} absolute top-0 left-0 rounded-full border-4 border-b-transparent border-pink-500 animate-spin [animation-delay:-0.5s]`}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`${textSizeClasses[size]} font-medium text-gray-700 dark:text-white`}
        >
          {text}
          <span className="opacity-0">{".".repeat(3)}</span>
        </span>
      </div>
    </div>
  );

  // Pulse variant
  const PulseLoader = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse`}
      ></div>
      <span
        className={`${textSizeClasses[size]} font-medium text-gray-700 dark:text-white flex items-center`}
      >
        {text}
        <span className="ml-1">
          {".".repeat(dots)}
          <span className="opacity-0">{".".repeat(3 - dots)}</span>
        </span>
      </span>
    </div>
  );

  // Dots variant
  const DotsLoader = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2">
        {[0, 1, 2,4,5].map((i) => (
          <div
            key={i}
            className={`${
              size === "small"
                ? "w-3 h-3"
                : size === "medium"
                ? "w-4 h-4"
                : "w-5 h-5"
            } rounded-full bg-blue-500 animate-bounce`}
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
      <span
        className={`${textSizeClasses[size]} font-medium text-gray-700 dark:text-white`}
      >
        {text}
      </span>
    </div>
  );

  // Progress variant
  const ProgressLoader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
      }, 200);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="flex flex-col items-center justify-center space-y-4 w-64 max-w-full">
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span
          className={`${textSizeClasses[size]} font-medium text-gray-700 dark:text-white`}
        >
          {text} {progress}%
        </span>
      </div>
    );
  };

  // Skeleton variant
  const SkeletonLoader = () => (
    <div className="flex flex-col items-center justify-center space-y-4 w-64 max-w-full">
      <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
      <span
        className={`${textSizeClasses[size]} font-medium text-gray-700 dark:text-white mt-2`}
      >
        {text}
      </span>
    </div>
  );

  // Render selected variant
  const renderLoader = () => {
    switch (variant) {
      case "pulse":
        return <PulseLoader />;
      case "dots":
        return <DotsLoader />;
      case "progress":
        return <ProgressLoader />;
      case "skeleton":
        return <SkeletonLoader />;
      default:
        return <ModernLoader />;
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen bg-black text-white">
      <div className="transform transition-all duration-300 hover:scale-105">
        {renderLoader()}
      </div>
    </div>
  );
};

export default Loader;
