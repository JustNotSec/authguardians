
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import IntegrationSection from '@/components/IntegrationSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';
import DashboardPreview from '@/components/DashboardPreview';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        {/* Dashboard Preview */}
        <div className="container mx-auto px-4 md:px-6 pb-20 -mt-10 md:-mt-16 relative z-10">
          <DashboardPreview />
        </div>
        
        <FeaturesSection />
        <IntegrationSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
