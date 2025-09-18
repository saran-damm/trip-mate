import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Icon from "../../components/common/IconProvider";

export default function Auth() {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  
  // Start animation when component mounts
  useEffect(() => {
    // Small delay to ensure the transition is visible
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (step < 1) {
      // Animate out current step
      setIsAnimating(false);
      
      // After animation completes, change step and animate in
      setTimeout(() => {
        setStep(step + 1);
        setIsAnimating(true);
      }, 300);
    } else {
      // Animate out before navigation
      setIsAnimating(false);
      setTimeout(() => {
        navigate("/home");
      }, 300);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-light to-surface/50"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/10 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-secondary/10 blur-xl"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-accent/10 blur-xl animate-pulse-slow"></div>
      
      {/* Travel-themed decorative icons */}
      <div className="absolute top-[10%] right-[10%] opacity-10 animate-float-slow">
        <Icon icon="globe" size="3x" className="text-primary" />
      </div>
      <div className="absolute bottom-[10%] left-[10%] opacity-10 animate-float-medium">
        <Icon icon="suitcase" size="2x" className="text-secondary" />
      </div>
      
      <div className={`w-full max-w-md transition-all duration-500 transform z-10
        ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {step === 0 && (
          <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <Icon icon="hand-peace" size="lg" className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Welcome
              </h1>
            </div>
            
            <p className="text-neutral mb-8 text-lg">
              Plan your next adventure with AI-powered itineraries tailored to
              your budget, style, and interests.
            </p>

            <Button 
              label="Get Started" 
              onClick={handleContinue} 
              variant="primary"
              fullWidth
              size="lg"
            />
          </Card>
        )}

        {step === 1 && (
          <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90 p-8 rounded-2xl">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <Icon icon="lock" size="lg" className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Sign In
              </h1>
            </div>

            <div className="space-y-6 mb-8">
              <div className="relative">
                <label className="text-sm text-neutral/70 mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border-2 border-primary/20 focus:border-primary/50 rounded-xl bg-white/50 outline-none transition-all"
                />
              </div>
              
              <div className="relative">
                <label className="text-sm text-neutral/70 mb-1 block">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-primary/20 focus:border-primary/50 rounded-xl bg-white/50 outline-none transition-all"
                />
                <div className="text-xs text-right mt-1">
                  <a href="#" className="text-primary hover:underline">Forgot password?</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                label="Login" 
                onClick={handleContinue} 
                variant="primary"
                fullWidth
                size="lg"
              />
              <div className="text-center text-sm text-neutral mt-4">
                Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
