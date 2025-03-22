
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description,
  className = "",
  style
}) => {
  return (
    <div className={`glass-panel p-6 card-hover ${className}`} style={style}>
      <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="text-blue-600 dark:text-blue-400" size={22} />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
