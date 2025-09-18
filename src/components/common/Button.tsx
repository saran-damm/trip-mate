import type { ReactNode } from 'react';

type ButtonProps = {
  label: string | ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "accent" | "success";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  disabled?: boolean;
  animated?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  label,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  iconPosition = "left",
  className = "",
  disabled = false,
  animated = true,
  type = "button",
}: ButtonProps) {
  // Variant styles
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary-light",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
    accent: "bg-accent text-dark hover:bg-accent/90",
    success: "bg-success text-dark hover:bg-success/90",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  // Animation class
  const animationClass = animated ? "transform transition-all duration-300 hover:-translate-y-1" : "";
  
  // Shadow class based on variant
  const shadowClass = variant === "outline" ? "" : "shadow-button hover:shadow-lg";
  
  // Width class
  const widthClass = fullWidth ? "w-full" : "";

  // Disabled class
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${widthClass} 
        ${animationClass} 
        ${shadowClass} 
        ${disabledClass} 
        ${className}
        rounded-button font-semibold transition-all flex items-center justify-center gap-2
      `}
    >
      {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
      {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
}
