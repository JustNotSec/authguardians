
import React from 'react';
import PricingCard from './PricingCard';
import { Button } from '@/components/ui/button';

const PricingSection = () => {
  const pricingPlans = [
    {
      title: 'Basic',
      price: '$19',
      description: 'Essential tools for small applications with limited users.',
      features: [
        { text: 'Up to 500 Users', included: true },
        { text: 'Basic Authentication', included: true },
        { text: 'License Management', included: true },
        { text: 'API Access', included: true },
        { text: 'HWID Locking', included: true },
        { text: 'Email Support', included: true },
        { text: 'Advanced Security', included: false },
        { text: 'Custom Branding', included: false },
      ],
      popular: false
    },
    {
      title: 'Professional',
      price: '$49',
      description: 'Complete solution for growing applications and businesses.',
      features: [
        { text: 'Up to 5,000 Users', included: true },
        { text: 'Advanced Authentication', included: true },
        { text: 'License Management', included: true },
        { text: 'Full API Access', included: true },
        { text: 'HWID Locking', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Advanced Security', included: true },
        { text: 'Custom Branding', included: true },
      ],
      popular: true
    },
    {
      title: 'Business',
      price: '$99',
      description: 'Enhanced features for larger applications with advanced needs.',
      features: [
        { text: 'Up to 20,000 Users', included: true },
        { text: 'Advanced Authentication', included: true },
        { text: 'License Management', included: true },
        { text: 'Full API Access', included: true },
        { text: 'HWID Locking', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Advanced Security', included: true },
        { text: 'Custom Branding', included: true },
      ],
      popular: false
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for large organizations with custom requirements.',
      features: [
        { text: 'Unlimited Users', included: true },
        { text: 'Advanced Authentication', included: true },
        { text: 'License Management', included: true },
        { text: 'Full API Access', included: true },
        { text: 'HWID Locking', included: true },
        { text: 'Dedicated Support', included: true },
        { text: 'Advanced Security', included: true },
        { text: 'Custom Branding', included: true },
      ],
      popular: false,
      buttonText: 'Contact Sales'
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Choose the plan that fits your application needs. All plans include core authentication features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              buttonText={plan.buttonText}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need a custom solution or have questions?
          </p>
          <Button variant="outline">Contact Our Sales Team</Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
