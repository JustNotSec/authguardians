
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  
  return (
    <Card className="w-full max-w-md mx-auto glass-panel">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your information to create your KeyAuth account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Doe" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{' '}
            <Link to="/terms" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              terms of service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              privacy policy
            </Link>
          </label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full bg-blue-600 hover:bg-blue-700">Create account</Button>
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            Log in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
