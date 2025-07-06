import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Users } from 'lucide-react';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50";
  const variantClasses = {
    primary: "bg-[#4F46E5] hover:bg-[#22D3EE] focus:ring-[#22D3EE]",
    secondary: "bg-[#22D3EE] hover:bg-[#4F46E5] focus:ring-[#4F46E5]"
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </button>
  );
};

const AuthButtons = () => {
  const navigate = useNavigate();

  const handleSignIn = () => navigate('/signin');
  const handleSignUp = () => navigate('/signup');

  return (
    <div className="flex flex-row gap-4 w-full max-w-sm mx-auto">
      <Button onClick={handleSignIn} variant="primary" className="flex-1 px-4 py-2 text-sm">
        Sign In
      </Button>
      <Button onClick={handleSignUp} variant="primary" className="flex-1 px-4 py-2 text-sm">
        Sign Up
      </Button>
    </div>
  );
};

const Header = () => (
  <header className="w-full px-6 py-4">
    <h1 className="text-xl font-semibold text-[#0F172A]">StudentHelp</h1>
  </header>
);

const Logo = () => (
  <div className="flex justify-center mb-8">
    <div className="w-32 h-32 rounded-full border-4 border-[#4F46E5] flex items-center justify-center bg-white shadow-xl relative overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-1 z-10">
        <GraduationCap className="w-10 h-10 text-[#4F46E5]" />
        <div className="flex items-center space-x-1">
          <BookOpen className="w-5 h-5 text-[#22D3EE]" />
          <Users className="w-4 h-4 text-[#6366F1]" />
        </div>
      </div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#4F46E5]/20 via-[#6366F1]/10 to-[#22D3EE]/20"></div>
    </div>
  </div>
);

const Tagline = () => (
  <div className="space-y-2">
    <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
      Welcome to your Study Marketplace!
    </h2>
    <p className="text-lg md:text-xl text-[#0F172A] opacity-80">
      Sell unused items. Discover Essentials!
    </p>
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#4F46E5]/20 to-[#22D3EE]/30 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 text-center">
          <Logo />
          <Tagline />
          <AuthButtons />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
