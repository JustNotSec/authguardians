
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-md mx-auto space-y-6">
          <h1 className="text-8xl font-bold text-gradient">404</h1>
          <h2 className="text-2xl font-medium">Page not found</h2>
          <p className="text-gray-600 dark:text-gray-400">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
