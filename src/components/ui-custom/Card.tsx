
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
  animationDelay?: number;
}

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  className,
  animate = false,
  animationDelay = 0,
  ...props
}: CardProps) => {
  const baseClasses = "rounded-xl transition-all duration-300 overflow-hidden";
  
  const variantClasses = {
    default: "bg-card text-card-foreground shadow-sm",
    glass: "glass-card",
    elevated: "bg-white shadow-elevated"
  };
  
  const paddingClasses = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-7"
  };
  
  const animationClasses = animate 
    ? `opacity-0 translate-y-2 animate-fadeInUp` 
    : '';
  
  const animationStyle = animate && animationDelay > 0 
    ? { animationDelay: `${animationDelay}ms`, animationFillMode: 'forwards' } 
    : {};

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        animationClasses,
        className
      )}
      style={animationStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
