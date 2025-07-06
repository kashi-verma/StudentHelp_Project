import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Utility for conditional classes
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Input component
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Label component
const Label = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
});
Label.displayName = "Label";

// Button component
const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg px-4 py-2 transition-colors duration-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Password validation helper
const isStrongPassword = (password) => {
  return password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
};

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignUp = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!isStrongPassword(password)) {
      newErrors.password = "Password must be at least 8 characters and include a special character.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log('Sign up with:', { email, password, confirmPassword });
    // Add real submission logic here (e.g., API call)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#4F46E5]/30 to-[#22D3EE]/40 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Join <span className="text-[#4F46E5]">StudentHelp</span>
            </h1>
            <p className="text-gray-600 text-sm">
              Create your account to start<br />
              Your Buy & Sell journey
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email/Username
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5]"
                placeholder="kashish2@gmail.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5]"
                placeholder="At least 8 characters & 1 special char"
                required
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5]"
                placeholder="Re-enter your password"
                required
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <Button className="w-full py-3 text-lg font-semibold">
              Sign Up
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already a member?{' '}
              <Link
                to="/signin"
                className="text-[#4F46E5] hover:text-[#22D3EE] font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
