import React, { useState } from 'react';
import { BookOpenIcon, AcademicCapIcon, HeartIcon, RocketLaunchIcon, GlobeAltIcon, BeakerIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const categoryIcons = {
  science: BeakerIcon,
  fiction: BookOpenIcon,
  history: GlobeAltIcon,
  romance: HeartIcon,
  technology: RocketLaunchIcon,
  education: AcademicCapIcon,
};

const categoryColors = {
  science: 'from-blue-500 to-cyan-500',
  fiction: 'from-purple-500 to-pink-500',
  history: 'from-amber-500 to-orange-500',
  romance: 'from-red-500 to-pink-500',
  technology: 'from-green-500 to-emerald-500',
  education: 'from-indigo-500 to-purple-500',
};

export const CategoryCard = ({ category, onCategorySelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = categoryIcons[category.key] || BookOpenIcon;
  const gradientColor = categoryColors[category.key] || 'from-primary-500 to-accent-500';
  
  return (
    <div 
      onClick={() => onCategorySelect(category.key)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer card-interactive p-8 overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Animated background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
        <div className={`w-full h-full bg-gradient-to-br ${gradientColor} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
      </div>
      
      <div className="relative flex flex-col items-center text-center space-y-6">
        {/* Icon container with animation */}
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
          <div className={`relative p-5 bg-gradient-to-br ${gradientColor} bg-opacity-10 rounded-2xl transform group-hover:scale-110 transition-all duration-300`}>
            <IconComponent className={`h-10 w-10 text-transparent bg-gradient-to-br ${gradientColor} bg-clip-text`} 
              style={{ 
                stroke: `url(#gradient-${category.key})`,
                strokeWidth: 1.5,
                fill: 'none'
              }} 
            />
            {/* SVG gradient definition */}
            <svg width="0" height="0">
              <defs>
                <linearGradient id={`gradient-${category.key}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className={`text-${category.key === 'science' ? 'blue' : category.key === 'fiction' ? 'purple' : category.key === 'history' ? 'amber' : category.key === 'romance' ? 'red' : category.key === 'technology' ? 'green' : 'indigo'}-500`} stopColor="currentColor" />
                  <stop offset="100%" className={`text-${category.key === 'science' ? 'cyan' : category.key === 'fiction' ? 'pink' : category.key === 'history' ? 'orange' : category.key === 'romance' ? 'pink' : category.key === 'technology' ? 'emerald' : 'purple'}-500`} stopColor="currentColor" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-primary-600 group-hover:to-accent-600 transition-all duration-300">
            {category.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {category.description}
          </p>
          
          {/* Stats badge */}
          <div className="flex items-center justify-center gap-2">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${gradientColor} bg-opacity-10 text-gray-700 dark:text-gray-300`}>
              {category.count}
            </span>
            <ArrowRightIcon className={`h-4 w-4 text-gray-400 transform transition-all duration-300 ${isHovered ? 'translate-x-1 text-primary-600' : ''}`} />
          </div>
        </div>
      </div>
      
      {/* Hover indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};
