
import React from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
  rating?: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  name,
  role,
  company,
  content,
  avatarUrl,
  rating = 5
}) => {
  return (
    <div className="glass-panel p-6 card-hover">
      <div className="flex space-x-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">"{content}"</p>
      
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-gray-600 dark:text-gray-400 text-xs">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
