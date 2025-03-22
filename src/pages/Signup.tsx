
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SignupForm from '@/components/SignupForm';

const Signup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Update document title
    document.title = "Sign Up | BoltzAuth";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
