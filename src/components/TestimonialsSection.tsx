
import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'CTO',
      company: 'DevSecure',
      content: 'KeyAuth has transformed how we manage licenses for our security software. The integration was seamless and our piracy issues have dropped dramatically.',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'GameStudio XYZ',
      content: 'We integrated KeyAuth into our game launcher and it\'s been rock-solid. Our players have a smooth authentication experience and we can easily manage access to beta releases.',
      rating: 5
    },
    {
      name: 'Michael Peterson',
      role: 'Founder',
      company: 'CodeTools Inc',
      content: 'As a small development team, we needed a reliable authentication system without building it ourselves. KeyAuth provided exactly what we needed at a fraction of the cost of building in-house.',
      rating: 4
    },
    {
      name: 'Emma Rodriguez',
      role: 'Product Manager',
      company: 'CloudSync',
      content: 'The analytics provided by KeyAuth gave us insights into how our licenses were being used. This data helped us optimize our pricing strategy and improve customer retention.',
      rating: 5
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Developers</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            See why software teams choose KeyAuth for their authentication and license management needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              content={testimonial.content}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
