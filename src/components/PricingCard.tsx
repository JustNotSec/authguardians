
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  popular = false,
  buttonText = "Get Started"
}) => {
  return (
    <div className={`relative glass-panel p-6 md:p-8 h-full flex flex-col card-hover ${
      popular ? 'animated-border shadow-elevation' : ''
    }`}>
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
          Most Popular
        </div>
      )}
      
      <div className="mb-5">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
      </div>
      
      <div className="mb-6">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-gray-600 dark:text-gray-400 ml-1">/month</span>}
      </div>
      
      <div className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className={`mt-1 rounded-full p-1 ${
              feature.included 
                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
            }`}>
              <Check size={12} className="stroke-[3]" />
            </div>
            <span className={`ml-3 text-sm ${
              feature.included 
                ? 'text-gray-700 dark:text-gray-300'
                : 'text-gray-500 dark:text-gray-500'
            }`}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>
      
      <Button 
        className={`w-full ${
          popular 
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
        }`}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
