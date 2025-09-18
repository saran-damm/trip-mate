import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type PageTransitionProps = {
  children: React.ReactNode;
  transitionType?: 'fade' | 'slide-up' | 'slide-left' | 'zoom';
  duration?: number;
};

export default function PageTransition({
  children,
  transitionType = 'fade',
  duration = 300,
}: PageTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  // Get transition classes based on type
  const getTransitionClasses = () => {
    const baseClasses = 'transition-all';
    
    const typeClasses: Record<string, Record<string, string>> = {
      'fade': {
        fadeIn: 'opacity-100',
        fadeOut: 'opacity-0',
      },
      'slide-up': {
        fadeIn: 'opacity-100 translate-y-0',
        fadeOut: 'opacity-0 translate-y-8',
      },
      'slide-left': {
        fadeIn: 'opacity-100 translate-x-0',
        fadeOut: 'opacity-0 translate-x-8',
      },
      'zoom': {
        fadeIn: 'opacity-100 scale-100',
        fadeOut: 'opacity-0 scale-95',
      },
    };

    // Type assertion to ensure TypeScript knows these keys exist
    const transitionClasses = typeClasses[transitionType] || typeClasses['fade'];
    const stageClass = transitionClasses[transitionStage] || '';

    return `${baseClasses} ${stageClass}`;
  };

  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={getTransitionClasses()}
      style={{ transition: `all ${duration}ms ease-in-out` }}
      onTransitionEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
}

// Usage:
// Wrap your page content with PageTransition
// <PageTransition transitionType="slide-up">
//   <YourPageContent />
// </PageTransition>
