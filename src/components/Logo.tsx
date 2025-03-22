
import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ 
  className = "",
  size = "md",
  variant = "full"
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  const iconSizeMap = {
    sm: 18,
    md: 24,
    lg: 36
  };

  return (
    <div className={`flex items-center gap-2 font-bold ${sizeClasses[size]} ${className}`}>
      <ShieldCheck 
        className="text-blue-600" 
        size={iconSizeMap[size]} 
        strokeWidth={2.5} 
      />
      {variant === 'full' && (
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          KeyAuth
        </span>
      )}
    </div>
  );
};

export default Logo;
