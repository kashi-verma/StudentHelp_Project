import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';


const cn = (...classes) => classes.filter(Boolean).join(' ');


const BackgroundBlobs = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    {/* Top Left Blob */}
    <svg className="absolute top-[-8rem] left-[-8rem] w-[30rem] opacity-40 animate-pulse" viewBox="0 0 500 500">
      <defs>
        <linearGradient id="blob1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path fill="url(#blob1)" d="M410,310Q390,370,320,390Q250,410,180,390Q110,370,90,310Q70,250,90,190Q110,130,180,110Q250,90,320,110Q390,130,410,190Q430,250,410,310Z"/>
    </svg>
   
    <svg className="absolute bottom-[-10rem] right-[-10rem] w-[40rem] opacity-30 animate-pulse" viewBox="0 0 500 500">
      <defs>
        <linearGradient id="blob2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <path fill="url(#blob2)" d="M440,320Q410,390,320,410Q230,430,150,390Q70,350,70,250Q70,150,150,110Q230,70,320,110Q410,150,440,250Q470,350,440,320Z"/>
    </svg>
  </div>
);

const DynamicDots = ({ dotCount = 14 }) => {
  const [dots, setDots] = useState([]);
  const animationRef = useRef();

  useEffect(() => {
    const initialDots = Array.from({ length: dotCount }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: 8 + Math.random() * 10,
      dx: (Math.random() - 0.5) * 0.08,
      dy: (Math.random() - 0.5) * 0.08,
      color: Math.random() > 0.5 ? '#4F46E5' : '#22D3EE'
    }));
    setDots(initialDots);
  }, [dotCount]);

  useEffect(() => {
    function animate() {
      setDots(prevDots =>
        prevDots.map(dot => {
          let { x, y, dx, dy } = dot;
          x += dx;
          y += dy;
          if (x < 0 || x > 100) dx *= -1;
          if (y < 0 || y > 100) dy *= -1;
          return { ...dot, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)), dx, dy };
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none -z-10">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-40"
          style={{
            width: `${dot.r}px`,
            height: `${dot.r}px`,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            background: dot.color,
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
};

// Designful Logo (SVG)
const Logo = () => (
  <div className="relative flex items-center justify-center w-16 h-16 mx-auto mb-4">
    {/* Background stylized book */}
    <svg
      viewBox="0 0 64 64"
      className="absolute w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Book base */}
      <rect x="8" y="20" width="48" height="28" rx="6" fill="#EEF2FF" />
      {/* Book pages */}
      <rect x="14" y="24" width="36" height="20" rx="3" fill="#fff" />
      {/* Book spine */}
      <rect x="30" y="24" width="4" height="20" rx="2" fill="#6366F1" />
      {/* Sparkle */}
      <circle cx="52" cy="24" r="2" fill="#22D3EE" />
      <circle cx="12" cy="30" r="1.5" fill="#4F46E5" />
    </svg>
    {/* Graduation Cap */}
    <svg
      viewBox="0 0 32 32"
      className="absolute w-8 h-8 top-1 left-1/2 -translate-x-1/2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="16,4 28,10 16,16 4,10" fill="#4F46E5" />
      <rect x="14" y="16" width="4" height="6" fill="#6366F1" />
      <circle cx="16" cy="22" r="1.3" fill="#22D3EE" />
    </svg>
  </div>
);

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
        "relative bg-gradient-to-r from-[#4F46E5] to-[#22D3EE] hover:from-[#22D3EE] hover:to-[#4F46E5] text-white rounded-lg px-4 py-2 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#22D3EE]/40",
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
    // Submit logic here
    console.log('Sign up with:', { email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#4F46E5]/30 to-[#22D3EE]/40 flex items-center justify-center px-4 relative overflow-hidden">
      <BackgroundBlobs />
      <DynamicDots dotCount={14} />
      <div className="w-full max-w-md z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-100">
          <Logo />
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Join <span className="bg-gradient-to-r from-[#4F46E5] to-[#22D3EE] bg-clip-text text-transparent font-extrabold">StudentHelp</span>
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

            <Button className="w-full py-3">
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

