import React from 'react';

export const MountainsDivider = ({ className = '', fill = '#E6EFE3', flip = false }) => (
  <div className={`overflow-hidden leading-[0] w-full ${className}`}>
    <svg 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none" 
      className={`w-full h-16 sm:h-24 md:h-32 block ${flip ? 'rotate-180' : ''}`} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M0,50 C200,100 400,0 600,60 C800,120 1000,20 1200,70 L1200,120 L0,120 Z" 
        fill={fill} 
        opacity="0.25"
      />
      <path 
        d="M0,80 C200,130 450,20 650,80 C850,140 1050,40 1200,90 L1200,120 L0,120 Z" 
        fill={fill} 
        opacity="0.5"
      />
      <path 
        d="M0,100 C250,150 500,40 700,100 C900,150 1100,60 1200,100 L1200,120 L0,120 Z" 
        fill={fill}
      />
    </svg>
  </div>
);
