import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Users } from 'lucide-react';

// Animated SVG Background Blobs
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
    {/* Bottom Right Blob */}
    <svg className="absolute bottom-[-10rem] right-[-10rem] w-[40rem] opacity-30 animate-pulse" viewBox="0 0 500 500">
      <defs>
        <linearGradient id="blob2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <path fill="url(#blob2)" d="M440,320Q410,390,320,410Q230,430,150,390Q70,350,70,250Q70,150,150,110Q230,70,320,110Q410,150,440,250Q470,350,440,320Z"/>
    </svg>
    {/* Wavy Divider */}
    <svg className="absolute bottom-0 left-0 w-full" height="100" viewBox="0 0 1440 320">
      <path fill="#EEF2FF" fillOpacity="1" d="M0,224L80,197.3C160,171,320,117,480,112C640,107,800,149,960,186.7C1120,224,1280,256,1360,272L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
    </svg>
  </div>
);

// Dynamic Particle Dots
const DynamicDots = ({ dotCount = 18 }) => {
  const [dots, setDots] = useState([]);
  const animationRef = useRef();

  // Initialize dots
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

  // Animate
  useEffect(() => {
    function animate() {
      setDots(prevDots =>
        prevDots.map(dot => {
          let { x, y, dx, dy } = dot;
          x += dx;
          y += dy;
          // Bounce off edges
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

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClasses = "px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 shadow-lg hover:shadow-2xl";
  const variantClasses = {
    primary: "bg-gradient-to-r from-[#4F46E5] to-[#22D3EE] hover:from-[#22D3EE] hover:to-[#4F46E5] focus:ring-[#22D3EE]",
    secondary: "bg-[#22D3EE] hover:bg-[#4F46E5] focus:ring-[#4F46E5]"
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 rounded-xl bg-white opacity-0 hover:opacity-10 transition"></span>
    </button>
  );
};

const AuthButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-4 w-full max-w-xs mx-auto mt-4 md:mt-6">
      <Button onClick={() => navigate('/signin')} variant="primary" className="flex-1 px-4 py-2 text-sm relative overflow-hidden">
        Sign In
      </Button>
      <Button onClick={() => navigate('/signup')} variant="primary" className="flex-1 px-4 py-2 text-sm relative overflow-hidden">
        Sign Up
      </Button>
    </div>
  );
};

const Header = () => (
  <header className="w-full px-6 py-4 flex justify-between items-center bg-white/60 backdrop-blur-md shadow-sm rounded-b-2xl">
    <div className="flex items-center space-x-2">
      <Logo />
      <span className="text-2xl font-extrabold text-[#4F46E5] tracking-tight drop-shadow-md logo-gradient-text">
        StudentHelp
      </span>
    </div>
  </header>
);

const Logo = () => (
  <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16">
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

// const Logo = () => (
//   <div className="flex justify-center mb-6 md:mb-8">
//     <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-[#4F46E5] flex items-center justify-center bg-white shadow-2xl relative overflow-hidden">
//       {/* Animated ring */}
//       <span className="absolute inset-0 rounded-full border-4 border-dashed border-[#22D3EE]/40 animate-spin-slow"></span>
//       <div className="flex flex-col items-center justify-center space-y-1 z-10">
//         <GraduationCap className="w-10 h-10 md:w-12 md:h-12 text-[#4F46E5] drop-shadow-lg" />
//         <div className="flex items-center space-x-2">
//           <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[#22D3EE]" />
//           <Users className="w-4 h-4 md:w-5 md:h-5 text-[#6366F1]" />
//         </div>
//       </div>
//       <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#4F46E5]/20 via-[#6366F1]/10 to-[#22D3EE]/20"></div>
//     </div>
//   </div>
// );

const Tagline = () => (
  <div className="space-y-2">
    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] drop-shadow-md">
      Welcome to your Study Marketplace!
    </h2>
    <p className="text-base md:text-lg text-[#0F172A] opacity-80">
      Sell unused items. Discover Essentials!
    </p>
  </div>
);

// Only TWO feature cards now
const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-[#4F46E5]" />,
    title: "List Study Materials",
    desc: "Quickly upload and sell your old notes, books, and supplies."
  },
  {
    icon: <Users className="w-8 h-8 text-[#22D3EE]" />,
    title: "Find Essentials",
    desc: "Browse curated items from your campus community."
  }
];

const FeatureCards = () => (
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
    {features.map((f, i) => (
      <div
        key={i}
        className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl flex flex-col items-center transition-all hover:scale-105 hover:shadow-2xl group border border-[#EEF2FF] relative overflow-hidden"
      >
        <div className="mb-4">{f.icon}</div>
        <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#4F46E5] transition">{f.title}</h3>
        <p className="text-sm text-[#0F172A] opacity-80">{f.desc}</p>
        {/* Animated gradient highlight */}
        <span className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-[#22D3EE]/30 to-[#4F46E5]/10 rounded-full blur-2xl opacity-80 group-hover:opacity-100 transition"></span>
      </div>
    ))}
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#EEF2FF] via-[#4F46E5]/10 to-[#22D3EE]/20 flex flex-col overflow-x-hidden">
      <BackgroundBlobs />
      <DynamicDots dotCount={18} />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-2 pt-6 pb-12">
        <div className="w-full max-w-md md:max-w-2xl mx-auto text-center relative z-10">
          <Logo />
          <Tagline />
          {/* Auth Buttons right after tagline/logo */}
          <AuthButtons />
          {/* Features below buttons, with margin */}
          <FeatureCards />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

/* --- Tailwind CSS Animations (add to your global CSS or tailwind.config.js) ---
@layer utilities {
  .animate-spin-slow {
    animation: spin 8s linear infinite;
  }
}
*/

