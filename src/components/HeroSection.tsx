
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Lock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -right-20 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/20 rounded-full filter blur-3xl opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></span>
            Secure Authentication & License Management
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Protect Your Software with{' '}
            <span className="text-gradient">Advanced Authentication</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            KeyAuth provides powerful authentication, license management, and application security tools for developers building professional software.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/signup">
              <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" size="lg" className="px-8">
                Documentation
              </Button>
            </Link>
          </div>
          
          <div className="pt-6 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Lock className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
              HWID Lock
            </div>
            <div className="flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
              License Management
            </div>
            <div className="flex items-center">
              <Code className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
              API Integrations
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
