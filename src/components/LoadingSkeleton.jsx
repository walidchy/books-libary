import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(12)].map((_, index) => (
        <div 
          key={index} 
          className="card h-full flex flex-col animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Image skeleton */}
          <div className="relative h-72 overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-t-2xl">
            <div className="absolute inset-0 skeleton"></div>
            
            {/* Favorite button skeleton */}
            <div className="absolute top-3 right-3 w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            
            {/* Category badge skeleton */}
            <div className="absolute top-3 left-3 w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="p-5 flex-grow flex flex-col space-y-4">
            {/* Title skeleton */}
            <div className="space-y-2">
              <div className="h-5 skeleton rounded-lg w-full"></div>
              <div className="h-5 skeleton rounded-lg w-3/4"></div>
            </div>
            
            {/* Author skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 skeleton rounded-lg w-1/2"></div>
            </div>
            
            {/* Rating skeleton */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-4 skeleton rounded-lg w-12"></div>
            </div>
            
            {/* Year skeleton */}
            <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 skeleton rounded-lg w-32"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
