
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  
  return (
    <Card className="w-full max-w-md mx-auto glass-panel">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Log in to your account</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Forgot password?
            </Link>
          </div>
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
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full bg-blue-600 hover:bg-blue-700">Log in</Button>
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
