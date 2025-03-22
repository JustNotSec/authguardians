
import React from 'react';
import FeatureCard from './FeatureCard';
import { 
  Shield, Key, BarChart3, Code, Lock, Users, Globe, Zap 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Authentication Platform',
      description: 'Secure user authentication with multiple verification methods and built-in security features.',
    },
    {
      icon: Key,
      title: 'License Management',
      description: 'Create, distribute and manage software licenses with advanced validation and restrictions.',
    },
    {
      icon: Lock,
      title: 'Application Protection',
      description: 'Protect your applications from reverse engineering, tampering, and unauthorized use.',
    },
    {
      icon: Code,
      title: 'API & Integration',
      description: 'Comprehensive API with support for multiple programming languages and easy integration.',
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Manage users, roles, and permissions with a simple and intuitive administration interface.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Metrics',
      description: 'Track usage, authentication attempts, and license activations with detailed analytics.',
    },
    {
      icon: Globe,
      title: 'Global Infrastructure',
      description: 'High-availability infrastructure with distributed servers for fast authentication worldwide.',
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Monitor authentication attempts, license usage, and security events in real-time.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">All-in-One Security Solution</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            KeyAuth combines robust authentication, license management, and application security in one powerful platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
