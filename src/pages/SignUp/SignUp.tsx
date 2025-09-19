import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../components/common/Toast";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Icon from "../../components/common/IconProvider";

export default function SignUp() {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true);
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: ""
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Start animation when component mounts
  useEffect(() => {
    // Small delay to ensure the transition is visible
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        setErrors({
          ...errors,
          image: "Please select an image file"
        });
        return;
      }

      // Clear any previous error
      setErrors({
        ...errors,
        image: ""
      });

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate password
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Validate image
    if (!imagePreview) {
      newErrors.image = "Profile image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setLoading(true);
        
        // Get the selected image file
        const imageFile = fileInputRef.current?.files?.[0];
        
        if (!imageFile) {
          showToast("Please select a profile image", "error");
          return;
        }
        
        // Register the user
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          profile_image: imageFile
        });
        
        showToast("Account created successfully!", "success");
        // The redirect will be handled by the isAuthenticated effect
      } catch (error) {
        console.error("Registration error:", error);
        showToast(error instanceof Error ? error.message : "Registration failed. Please try again.", "error");
      } finally {
        setLoading(false);
      }
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
        <Icon icon={"globe" as const} size="3x" className="text-primary" />
      </div>
      <div className="absolute bottom-[10%] left-[10%] opacity-10 animate-float-medium">
        <Icon icon={"suitcase" as const} size="2x" className="text-secondary" />
      </div>
      
      <div className={`w-full max-w-md transition-all duration-500 transform z-10
        ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90 p-8 rounded-2xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
              <Icon icon={"user" as const} size="lg" className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Sign Up
            </h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center mb-4">
              <div 
                className="w-24 h-24 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center cursor-pointer overflow-hidden mb-2"
                onClick={triggerFileInput}
              >
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Profile Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon icon={"user" as const} size="2x" className="text-primary/50" />
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button 
                type="button" 
                onClick={triggerFileInput}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <Icon icon={"camera" as const} className="text-xs" /> Upload Profile Photo
              </button>
              {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
            </div>

            {/* Name Field */}
            <div className="relative">
              <label className="text-sm text-neutral/70 mb-1 block">Full Name</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-primary">
                  <Icon icon={"user" as const} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-10 py-3 border-2 border-primary/20 focus:border-primary/50 rounded-xl bg-white/50 outline-none transition-all"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            {/* Email Field */}
            <div className="relative">
              <label className="text-sm text-neutral/70 mb-1 block">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-primary">
                  <Icon icon={"envelope" as const} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-10 py-3 border-2 border-primary/20 focus:border-primary/50 rounded-xl bg-white/50 outline-none transition-all"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            {/* Password Field */}
            <div className="relative">
              <label className="text-sm text-neutral/70 mb-1 block">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-primary">
                  <Icon icon={"lock" as const} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-10 py-3 border-2 border-primary/20 focus:border-primary/50 rounded-xl bg-white/50 outline-none transition-all"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            
            {/* Confirm Password Field */}
            <div className="relative">
              <label className="text-sm text-neutral/70 mb-1 block">Confirm Password</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-primary">
                  <Icon icon={"lock" as const} />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-10 py-3 border-2 border-primary/20 focus:border-primary/50 rounded-xl bg-white/50 outline-none transition-all"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="pt-4">
              <Button 
                label={loading ? "Creating Account..." : "Create Account"}
                variant="primary"
                fullWidth
                size="lg"
                type="submit"
                disabled={loading}
              />
            </div>
            
            <div className="text-center text-sm text-neutral mt-4">
              Already have an account? <Link to="/auth" className="text-primary hover:underline">Sign In</Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
