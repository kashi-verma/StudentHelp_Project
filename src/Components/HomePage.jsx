import React, { useState, useRef, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Search, Menu, Star, Users, Shield, Zap } from 'lucide-react';

// --- Animated SVG Background Blobs ---
const BackgroundBlobs = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
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

// --- Dynamic Animated Dots ---
const DynamicDots = ({ dotCount = 16 }) => {
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

// --- Custom SVG Logo ---
const Logo = () => (
  <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
    <svg viewBox="0 0 64 64" className="absolute w-full h-full" fill="none">
      <rect x="8" y="20" width="48" height="28" rx="6" fill="#EEF2FF" />
      <rect x="14" y="24" width="36" height="20" rx="3" fill="#fff" />
      <rect x="30" y="24" width="4" height="20" rx="2" fill="#6366F1" />
      <circle cx="52" cy="24" r="2" fill="#22D3EE" />
      <circle cx="12" cy="30" r="1.5" fill="#4F46E5" />
    </svg>
    <svg viewBox="0 0 32 32" className="absolute w-6 h-6 top-1 left-1/2 -translate-x-1/2" fill="none">
      <polygon points="16,4 28,10 16,16 4,10" fill="#4F46E5" />
      <rect x="14" y="16" width="4" height="6" fill="#6366F1" />
      <circle cx="16" cy="22" r="1.3" fill="#22D3EE" />
    </svg>
  </div>
);

// --- Carousel Images & Settings ---
const carouselImages = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXV7cFpqMgZ3EMvqroaMGvrC33DuPoH8LpTQ&s",
    alt: "Student marketplace 1",
    title: "Buy & Sell with Confidence",
    description: "Connect with fellow students in Sikar for safe, reliable transactions"
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkzQaoqniFwzF9EWxYdg_6DQOlSsfhfA60fw&s",
    alt: "Student marketplace 2",
    title: "Campus Community",
    description: "Join thousands of students already trading on our platform"
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAmT-crKP_sksJ-23XtpKixwBZMBorx8uMaA&s",
    alt: "Student marketplace 3",
    title: "Easy & Fast",
    description: "List your items in seconds, get offers in minutes"
  }
];

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  arrows: true,
  pauseOnHover: true,
  adaptiveHeight: true
};

const SlickCarousel = () => (
  <section className="relative mt-4 rounded-2xl max-w-4xl mx-auto shadow-xl bg-white/80 backdrop-blur-lg overflow-hidden">
    <Slider {...carouselSettings}>
      {carouselImages.map((img, idx) => (
        <div key={idx} className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover rounded-2xl"
            style={{ minHeight: 260 }}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
            <div className="text-center text-white px-4 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-lg">{img.title}</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto drop-shadow">{img.description}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </section>
);

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-[#4F46E5]" />,
      title: "Student Community",
      description: "Connect with verified students from your area"
    },
    {
      icon: <Shield className="w-6 h-6 md:w-8 md:h-8 text-[#22D3EE]" />,
      title: "Safe & Secure",
      description: "Protected transactions with verified profiles"
    },
    {
      icon: <Zap className="w-6 h-6 md:w-8 md:h-8 text-[#6366F1]" />,
      title: "Quick Deals",
      description: "Fast listing and instant communication"
    },
    {
      icon: <Star className="w-6 h-6 md:w-8 md:h-8 text-[#4F46E5]" />,
      title: "Trusted Platform",
      description: "Rated highly by thousands of students"
    }
  ];

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "Shop", href: "#shop" },
    { name: "Sell", href: "#sell" },
    { name: "Rate Us", href: "#rate" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add your search logic here
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#EEF2FF] via-[#4F46E5]/10 to-[#22D3EE]/20 flex flex-col overflow-x-hidden">
      <BackgroundBlobs />
      <DynamicDots dotCount={16} />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b z-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            {/* Logo and Project Name */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Logo />
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-[#4F46E5] to-[#22D3EE] bg-clip-text text-transparent">StudentHelp</h1>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4F46E5]" />
                  <input
                    type="text"
                    placeholder="Search products, books, electronics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white/80 text-[#0F172A] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                  />
                </div>
              </form>
            </div>

            {/* Hamburger Menu */}
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 hover:bg-[#EEF2FF] rounded-lg transition-colors"
                >
                  <Menu className="w-6 h-6 text-[#4F46E5]" />
                </button>
                {/* Hamburger Dropdown */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/90 rounded-xl shadow-xl border z-50">
                    <div className="py-2">
                      {menuItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-base text-[#0F172A] hover:bg-[#EEF2FF] transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4F46E5]" />
              <input
                type="text"
                placeholder="Search products, books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white/80 text-[#0F172A] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
              />
            </form>
          </div>
        </div>
      </header>

      {/* Slick Carousel Slideshow */}
      <SlickCarousel />

      {/* Motive Section */}
      <section className="py-10 sm:py-14 px-4">
        <div className="max-w-4xl mx-auto text-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
            Our Motive!
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#0F172A] opacity-80 leading-relaxed max-w-3xl mx-auto">
            We created this platform to support the student community in Sikar. Our mission is to provide 
            a safe, reliable, and convenient marketplace where students can buy and sell items, 
            connect with each other, and build a stronger community together.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-10 sm:py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-10">
            Why Choose StudentHelp?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg border hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-[#EEF2FF] rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-lg py-10 px-4 mt-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-base text-[#4F46E5] hover:text-[#22D3EE] transition-colors">About Us</a></li>
                <li><a href="#shop" className="text-base text-[#4F46E5] hover:text-[#22D3EE] transition-colors">Shop</a></li>
                <li><a href="#sell" className="text-base text-[#4F46E5] hover:text-[#22D3EE] transition-colors">Sell Items</a></li>
                <li><a href="#contact" className="text-base text-[#4F46E5] hover:text-[#22D3EE] transition-colors">Contact</a></li>
                <li><a href="#rate" className="text-base text-[#4F46E5] hover:text-[#22D3EE] transition-colors">Rate Us</a></li>
              </ul>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Address</h3>
              <address className="text-base text-[#334155] not-italic">
                <p>StudentHelp Platform</p>
                <p>Sikar, Rajasthan</p>
                <p>India - 332001</p>
                <p className="mt-2">
                  Email: support@studenthelp.com<br />
                  Phone: +91 9876543210
                </p>
              </address>
            </div>
          </div>
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-base text-[#64748b]">
              © 2025 StudentHelp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

/*
Add to your CSS or Tailwind config for the slow spin:
@layer utilities {
  .animate-spin-slow {
    animation: spin 8s linear infinite;
  }
}
*/
