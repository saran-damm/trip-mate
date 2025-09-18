import { useEffect, useState } from 'react';

type TravelLoadingAnimationProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
  loop?: boolean;
};

export default function TravelLoadingAnimation({
  size = 'md',
  className = '',
  text = 'Loading your journey...',
  loop = true,
}: TravelLoadingAnimationProps) {
  const [animationStep, setAnimationStep] = useState(0);
  
  // Size classes
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };
  
  // Text size classes
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  // Travel icons for animation sequence
  const travelIcons = [
    '✈️',  // Airplane
    '🚄',  // Train
    '🚗',  // Car
    '🚢',  // Ship
    '🚲',  // Bicycle
  ];
  
  // Background elements that stay static
  const backgroundElements = [
    '☁️',  // Cloud
    '🏙️',  // City
    '🏝️',  // Island
    '🗻',  // Mountain
    '🌴',  // Palm tree
  ];
  
  // Animation effect
  useEffect(() => {
    if (!loop && animationStep >= travelIcons.length - 1) {
      return;
    }
    
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % travelIcons.length);
    }, 800);
    
    return () => clearInterval(interval);
  }, [animationStep, loop, travelIcons.length]);
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Animation scene */}
      <div className={`relative h-24 w-full max-w-xs mb-4 ${sizeClasses[size]}`}>
        {/* Background elements */}
        <div className="absolute inset-0 flex justify-between items-start opacity-50">
          {backgroundElements.map((element, index) => (
            <span 
              key={index} 
              className="transform"
              style={{ 
                opacity: 0.7,
                transform: `translateY(${index % 2 === 0 ? '10px' : '5px'})` 
              }}
            >
              {element}
            </span>
          ))}
        </div>
        
        {/* Moving vehicle */}
        <div 
          className="absolute transition-all duration-700 ease-in-out"
          style={{ 
            left: `${(animationStep / (travelIcons.length - 1)) * 100}%`,
            transform: 'translateX(-50%)',
            bottom: '10px'
          }}
        >
          {travelIcons[animationStep]}
        </div>
        
        {/* Path/Road */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/30 rounded"></div>
      </div>
      
      {/* Loading text */}
      <div className={`text-center ${textSizeClasses[size]}`}>
        <p className="text-neutral font-medium">{text}</p>
        <div className="mt-2 flex justify-center gap-1">
          <span className={`animate-bounce delay-100`}>•</span>
          <span className={`animate-bounce delay-200`}>•</span>
          <span className={`animate-bounce delay-300`}>•</span>
        </div>
      </div>
    </div>
  );
}
