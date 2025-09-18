import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/common/IconProvider";

export default function Splash() {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Start with animation
    setIsAnimating(true);
    
    // After logo animation, navigate to auth
    const timer = setTimeout(() => {
      setIsAnimating(false);
      
      // Add a small delay before navigation to allow exit animation
      setTimeout(() => {
        navigate("/auth");
      }, 300);
    }, 2200); // slightly shorter to account for transition
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background with pastel gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-secondary/70 to-accent/80 animate-gradient"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating travel icons */}
        <div className="absolute top-[10%] left-[15%] opacity-30 animate-float-slow">
          <Icon icon="plane" size="3x" className="text-primary" />
        </div>
        <div className="absolute top-[25%] right-[20%] opacity-20 animate-float-medium">
          <Icon icon="mountain" size="2x" className="text-accent" />
        </div>
        <div className="absolute bottom-[30%] left-[25%] opacity-20 animate-float-fast">
          <Icon icon="car" size="2x" className="text-secondary" />
        </div>
        <div className="absolute bottom-[15%] right-[15%] opacity-30 animate-float-medium">
          <Icon icon="suitcase" size="3x" className="text-primary" />
        </div>
        
        {/* Pastel circles */}
        <div className="absolute top-[5%] right-[30%] w-32 h-32 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute bottom-[10%] left-[20%] w-48 h-48 rounded-full bg-secondary/20 blur-xl"></div>
        <div className="absolute top-[40%] left-[5%] w-24 h-24 rounded-full bg-accent/20 blur-xl"></div>
      </div>
      
      {/* Content */}
      <div className={`text-center text-white z-10 transition-all duration-500 ${isAnimating ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
        {/* Logo container with backdrop */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full w-24 h-24 mx-auto -z-10 animate-pulse-slow"></div>
          <div className="animate-float-medium py-4 flex justify-center">
            <Icon icon="plane" size="4x" className="text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-wide animate-fadeIn bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
        TripMate
        </h1>
        
        <p className="mt-4 text-xl font-light opacity-90 animate-fadeIn px-6 max-w-md" style={{ animationDelay: '300ms' }}>
          Your smart travel companion for unforgettable journeys
        </p>
        
        {/* Decorative line */}
        <div className="w-20 h-1 bg-white/50 rounded-full mx-auto mt-6 animate-fadeIn" style={{ animationDelay: '500ms' }}></div>
      </div>
    </div>
  );
}
