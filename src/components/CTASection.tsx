
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 dark:bg-blue-900/10 rounded-full filter blur-3xl opacity-60 transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-50 dark:bg-indigo-900/10 rounded-full filter blur-3xl opacity-60 transform -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="glass-panel p-8 md:p-12 max-w-4xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Application?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Start protecting your software with KeyAuth's authentication and license management system. 
              Set up your application in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="px-8">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
