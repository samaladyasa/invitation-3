import React from 'react';
export const SectionDivider = ({ className = '', fill = '#F3E7D8', flip = false }) => (<div className={`overflow-hidden leading-[0] ${className}`}>
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-24 block ${flip ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 C300,90 600,20 900,80 1050,110 1200,20 1200,20 L1200,120 L0,120 Z" fill={fill}/>
    </svg>
  </div>);
