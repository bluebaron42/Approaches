import React from 'react';

export interface SlideProps {
  isPresentation: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Slide({ isPresentation, children, className = '' }: SlideProps) {
  return (
    <div 
      className={`
        w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black
        flex flex-col items-center
        ${isPresentation 
          ? 'overflow-y-auto overflow-x-hidden presentation-scroll scroll-smooth' 
          : 'overflow-y-auto custom-scrollbar'
        }
        transition-all duration-300
        ${className}
      `}
    >
      <div className={`
        w-full min-h-full
        ${isPresentation ? 'p-6 md:p-8 lg:p-12 scale-[1.05] origin-top' : 'p-8'}
        flex flex-col items-center justify-center
      `}>
        {children}
      </div>
    </div>
  );
}
