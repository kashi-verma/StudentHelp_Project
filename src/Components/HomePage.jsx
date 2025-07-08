import React, { useState, useRef, useEffect } from 'react';

// --- Utility for classNames ---
const cn = (...classes) => classes.filter(Boolean).join(' ');

// --- Animated SVG Background Blobs ---
const BackgroundBlobs = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    <svg className="absolute top-[-8rem] left-[-8rem] w-[30rem] md:w-[40rem] opacity-30 animate-pulse-slow" viewBox="0 0 500 500">
      <defs>
        <linearGradient id="blob1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" /> {/* Deeper purple */}
          <stop offset="100%" stopColor="#EC4899" /> {/* Vibrant pink */}
        </linearGradient>
      </defs>
      <path fill="url(#blob1)" d="M410,310Q390,370,320,390Q250,410,180,390Q110,370,90,310Q70,250,90,190Q110,130,180,110Q250,90,320,110Q390,130,410,190Q430,250,410,310Z" />
    </svg>
    <svg className="absolute bottom-[-10rem] right-[-10rem] w-[40rem] md:w-[50rem] opacity-20 animate-pulse-slow" viewBox="0 0 500 500">
      <defs>
        <linearGradient id="blob2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EC4899" /> {/* Vibrant pink */}
          <stop offset="100%" stopColor="#22D3EE" /> {/* Original teal */}
        </linearGradient>
      </defs>
      <path fill="url(#blob2)" d="M440,320Q410,390,320,410Q230,430,150,390Q70,350,70,250Q70,150,150,110Q230,70,320,110Q410,150,440,250Q470,350,440,320Z" />
    </svg>
  </div>
);

// --- Dynamic Animated Dots ---
const DynamicDots = ({ dotCount = 20 }) => { // Increased dot count for more subtle texture
  const [dots, setDots] = useState([]);
  const animationRef = useRef();

  useEffect(() => {
    const initialDots = Array.from({ length: dotCount }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: 6 + Math.random() * 8, // Slightly smaller and varied radius
      dx: (Math.random() - 0.5) * 0.05, // Slower movement
      dy: (Math.random() - 0.5) * 0.05, // Slower movement
      color: Math.random() > 0.5 ? '#93C5FD' : '#BFDBFE' // Lighter, more subtle blues
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
          className="absolute rounded-full opacity-30" // Reduced opacity for subtlety
          style={{
            width: `${dot.r}px`,
            height: `${dot.r}px`,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            background: dot.color,
            filter: 'blur(0.5px)' // Slightly less blur
          }}
        />
      ))}
    </div>
  );
};

// --- Logo SVG ---
const Logo = () => (
  <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16">
    <svg viewBox="0 0 64 64" className="absolute w-full h-full" fill="none">
      <rect x="8" y="20" width="48" height="28" rx="6" fill="#F0F9FF" /> {/* Lighter background for pop */}
      <rect x="14" y="24" width="36" height="20" rx="3" fill="#fff" />
      <rect x="30" y="24" width="4" height="20" rx="2" fill="#6366F1" />
      <circle cx="52" cy="24" r="2" fill="#22D3EE" />
      <circle cx="12" cy="30" r="1.5" fill="#8B5CF6" /> {/* New purple */}
    </svg>
    <svg viewBox="0 0 32 32" className="absolute w-6 h-6 top-1 left-1/2 -translate-x-1/2" fill="none">
      <polygon points="16,4 28,10 16,16 4,10" fill="#8B5CF6" /> {/* New purple */}
      <rect x="14" y="16" width="4" height="6" fill="#6366F1" />
      <circle cx="16" cy="22" r="1.3" fill="#22D3EE" />
    </svg>
  </div>
);

// --- Hamburger Menu Drawer ---
const Drawer = ({ open, onClose }) => (
  <>
    <div
      className={cn(
        "fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-xl shadow-2xl z-40 transform transition-transform duration-300 ease-out",
        open ? "translate-x-0" : "translate-x-full"
      )}
    >
      <button className="absolute top-5 right-5 text-4xl text-gray-600 hover:text-gray-800 transition-colors" onClick={onClose} aria-label="Close Menu">&times;</button>
      <nav className="flex flex-col mt-24 space-y-8 px-8">
        <a href="#about" className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">About</a>
        <a href="#shop" className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">Shop</a>
        <a href="#sell" className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">Sell</a>
        <a href="#rate" className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">Rate Us</a>
        <button className="mt-6 w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          Sign In
        </button>
      </nav>
    </div>
    {open && (
      <div
        className="fixed inset-0 bg-black/30 z-30"
        onClick={onClose}
        aria-hidden="true"
      ></div>
    )}
  </>
);

// --- Header with Search and Hamburger ---
const Header = ({ onMenu }) => (
  <header className="sticky top-0 w-full px-4 md:px-8 py-3 flex justify-between items-center bg-white/80 backdrop-blur-xl shadow-lg rounded-b-3xl z-20">
    <div className="flex items-center space-x-2 md:space-x-4">
      <Logo />
      <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">StudentHelp</span>
    </div>
    <div className="flex items-center space-x-2 md:space-x-4">
      <input
        type="text"
        placeholder="Search…"
        className="hidden md:block rounded-full px-4 py-2 border border-gray-200 focus:ring-2 focus:ring-purple-400 text-base bg-white/90 transition-all w-48 lg:w-64"
      />
      <button
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
        onClick={onMenu}
        aria-label="Open Menu"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>
    </div>
  </header>
);

// --- Hero Section ---
const HeroSection = () => (
  <section className="relative w-full max-w-6xl mx-auto mt-12 p-6 md:p-10 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl text-white flex flex-col md:flex-row items-center justify-between text-center md:text-left">
    <div className="md:w-1/2 mb-8 md:mb-0">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
        Your Campus Marketplace
      </h1>
      <p className="text-lg md:text-xl opacity-90 mb-8 max-w-md mx-auto md:mx-0">
        Easily buy, sell, and connect with students in Sikar for all your academic needs.
      </p>
      <div className="flex justify-center md:justify-start space-x-4">
        <button className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105">
          Start Selling
        </button>
        <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-white/20 transition-all transform hover:scale-105">
          Find Items
        </button>
      </div>
    </div>
    <div className="md:w-1/2 flex justify-center items-center">
      {/* Placeholder for an engaging illustration or rotating images */}
      <div className="w-64 h-64 md:w-80 md:h-80 bg-white/20 rounded-full flex items-center justify-center animate-pulse-slow">
        <span className="text-white text-xl font-semibold">Illustration Here</span>
      </div>
    </div>
  </section>
);


// --- Motive Section ---
const Motive = () => (
  <section className="w-full max-w-4xl mx-auto mt-20 text-center px-4">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
      Our Mission: Empowering Students
    </h2>
    <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
      We are dedicated to fostering a supportive and sustainable student community in Sikar by providing a seamless platform for exchanging academic resources and fostering connections.
    </p>
  </section>
);

// --- Features Section ---
const features = [
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 32 32">
        <rect x="7" y="8" width="18" height="16" rx="3" fill="#6366F1" />
        <rect x="10" y="11" width="12" height="10" rx="2" fill="#fff" />
      </svg>
    ),
    title: "Effortless Listing",
    desc: "Quickly upload and sell your old notes, textbooks, and supplies with an intuitive interface.",
    color: "from-indigo-400 to-blue-400"
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill="#22D3EE" />
        <rect x="10" y="14" width="12" height="5" rx="2" fill="#fff" />
      </svg>
    ),
    title: "Discover Local Deals",
    desc: "Browse a diverse range of curated academic essentials from your fellow campus peers.",
    color: "from-teal-400 to-cyan-400"
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 32 32">
        <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" fill="#F472B6" />
        <path d="M16 10L24 14V18L16 22L8 18V14L16 10Z" fill="#fff" />
      </svg>
    ),
    title: "Secure Transactions",
    desc: "Enjoy peace of mind with our secure and reliable platform for all your transactions.",
    color: "from-pink-400 to-rose-400"
  }
];

const FeatureCards = () => (
  <section className="w-full max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
    {features.map((f, i) => (
      <div
        key={i}
        className={cn(
          "bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl border border-gray-100 relative overflow-hidden group",
          `bg-gradient-to-br ${f.color}` // Apply dynamic gradient
        )}
      >
        <div className="mb-6 bg-white p-3 rounded-full shadow-md transition-transform group-hover:scale-110">
          {f.icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
        <p className="text-sm text-white/90 leading-relaxed">{f.desc}</p>
        <span className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl opacity-70 transition-all duration-500 group-hover:scale-150"></span>
      </div>
    ))}
  </section>
);

// --- Call to Action Section ---
const CallToAction = () => (
  <section className="w-full max-w-4xl mx-auto mt-20 p-8 text-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-3xl shadow-xl flex flex-col items-center justify-center">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Get Started?</h2>
    <p className="text-lg md:text-xl opacity-90 mb-8">
      Join the StudentHelp community today and make a difference!
    </p>
    <button className="bg-white text-purple-700 font-bold py-4 px-10 rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 hover:scale-105 text-lg">
      Join Now
    </button>
  </section>
);

// --- Quick Links & Footer ---
const Footer = () => (
  <footer className="w-full max-w-full mx-auto mt-20 bg-gray-800 text-gray-300 py-10 px-6 md:px-12 rounded-t-3xl shadow-inner border-t border-gray-700">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h4 className="text-lg font-bold text-white mb-4">StudentHelp</h4>
        <p className="text-sm leading-relaxed">
          Connecting students for a smarter, more sustainable campus life.
        </p>
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
        <nav className="flex flex-col space-y-2">
          <a href="#about" className="hover:text-white transition-colors">About Us</a>
          <a href="#shop" className="hover:text-white transition-colors">Shop Items</a>
          <a href="#sell" className="hover:text-white transition-colors">Sell Your Stuff</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-4">Contact Info</h4>
        <p className="text-sm">Sikar, Rajasthan, India</p>
        <p className="text-sm">Email: info@studenthelp.com</p>
      </div>
    </div>
    <div className="text-center mt-12 pt-8 border-t border-gray-700 text-sm opacity-70">
      © {new Date().getFullYear()} StudentHelp. All rights reserved.
    </div>
  </footer>
);

// --- HomePage Main Component ---
const HomePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col overflow-x-hidden font-sans">
      <BackgroundBlobs />
      <DynamicDots dotCount={20} />
      <Header onMenu={() => setDrawerOpen(true)} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="flex-1 flex flex-col items-center justify-start px-2 pt-6 pb-12 z-10">
        <HeroSection /> {/* Replaced Slideshow with Hero */}
        <Motive />
        <FeatureCards />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

/*
Add to your CSS or Tailwind config for the slow pulse and spin:
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

*/