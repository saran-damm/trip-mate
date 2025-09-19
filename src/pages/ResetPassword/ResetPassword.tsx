import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../components/common/Toast";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Icon from "../../components/common/IconProvider";

export default function ResetPassword() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { resetPassword } = useAuth();
  const { showToast } = useToast();

  // Start animation when component mounts
  useEffect(() => {
    // Small delay to ensure the transition is visible
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      showToast("Please enter your email address", "error");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    
    try {
      setLoading(true);
      await resetPassword(email);
      setResetSent(true);
      showToast("Password reset email sent. Please check your inbox.", "success");
    } catch (error) {
      console.error("Password reset error:", error);
      showToast(error instanceof Error ? error.message : "Failed to send reset email. Please try again.", "error");
    } finally {
      setLoading(false);
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
      
      <div className={`w-full max-w-md transition-all duration-500 transform z-10
        ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90 p-8 rounded-2xl">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
              <Icon icon={"lock" as const} size="lg" className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Reset Password
            </h1>
          </div>

          {!resetSent ? (
            <>
              <p className="text-neutral mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label className="text-sm text-neutral/70 mb-1 block">Email</label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-primary">
                      <Icon icon={"envelope" as const} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-10 py-3 border-2 border-primary/20 focus:border-primary/50 rounded-xl bg-white/50 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <Button 
                  label={loading ? "Sending..." : "Send Reset Link"}
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  disabled={loading}
                />
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <Icon icon={"check" as const} size="lg" className="text-success" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Email Sent</h2>
              <p className="text-neutral mb-6">
                Check your inbox for instructions to reset your password.
              </p>
            </div>
          )}
          
          <div className="text-center text-sm text-neutral mt-6">
            <Link to="/auth" className="text-primary hover:underline">Back to Login</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
