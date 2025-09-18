import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  bordered?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
  animated?: boolean;
  variant?: "default" | "primary" | "accent" | "success" | "warning" | "error";
  style?: React.CSSProperties;
};

export default function Card({
  children,
  className = "",
  hoverable = false,
  bordered = false,
  padding = "md",
  onClick,
  animated = true,
  variant = "default",
  style,
}: CardProps) {
  // Padding styles
  const paddingStyles = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  // Border styles
  const borderStyle = bordered ? "border border-neutral/20" : "";
  
  // Hover effect
  const hoverEffect = hoverable
    ? "transform transition-all duration-300 hover:-translate-y-1 hover:shadow-hover cursor-pointer"
    : "";
    
  // Animation
  const animationClass = animated ? "fade-in" : "";
  
  // Variant styles
  const variantStyles = {
    default: "bg-surface",
    primary: "bg-primary/10",
    accent: "bg-accent/10",
    success: "bg-success/10",
    warning: "bg-warning/10",
    error: "bg-error/10",
  };

  return (
    <div
      className={`
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${borderStyle}
        ${hoverEffect}
        ${animationClass}
        ${className}
        rounded-card shadow-card transition-all
      `}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
