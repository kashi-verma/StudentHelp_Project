import React, { useState, useRef, useEffect } from "react";
import { Menu, Search } from "lucide-react";

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
      color: Math.random() > 0.5 ? "#4F46E5" : "#22D3EE"
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
            filter: "blur(1px)"
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

// --- Example Data (Replace with real API/user data in production) ---
const exampleUser = {
  name: "Kashish",
  email: "kashish2@gmail.com"
};

const exampleSold = [
  {
    id: 1,
    name: "Physics Textbook",
    price: 220,
    status: "Sold",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400"
  },
  {
    id: 2,
    name: "Scientific Calculator",
    price: 400,
    status: "Available",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400"
  }
];

const examplePurchased = [
  {
    id: 1,
    name: "Laptop Stand",
    price: 350,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400"
  }
];

// --- User Dashboard Page ---
const UserDashBoard = () => {
  // In production, fetch authenticated user's items from API or context
  const user = exampleUser;
  const soldItems = exampleSold;
  const purchasedItems = examplePurchased;

  // Responsive header menu logic
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { name: "Home", href: "/home" },
    { name: "Shop", href: "#shop" },
    { name: "Sell", href: "/sell" },
    { name: "Rate Us", href: "#rate" }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#EEF2FF] via-[#4F46E5]/10 to-[#22D3EE]/20 flex flex-col overflow-x-hidden">
      <BackgroundBlobs />
      <DynamicDots dotCount={14} />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b z-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Logo />
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-[#4F46E5] to-[#22D3EE] bg-clip-text text-transparent">StudentHelp</h1>
            </div>
            <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
              <form className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4F46E5]" />
                  <input
                    type="text"
                    placeholder="Search products, books, electronics..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white/80 text-[#0F172A] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 hover:bg-[#EEF2FF] rounded-lg transition-colors"
                >
                  <Menu className="w-6 h-6 text-[#4F46E5]" />
                </button>
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
          <div className="md:hidden pb-4">
            <form className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4F46E5]" />
              <input
                type="text"
                placeholder="Search products, books..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white/80 text-[#0F172A] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
              />
            </form>
          </div>
        </div>
      </header>

      {/* Dashboard Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 pt-8 pb-12">
        <div className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-1">Welcome, {user.name}!</h2>
              <p className="text-[#64748b] text-sm">{user.email}</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <span className="bg-[#EEF2FF] text-[#4F46E5] px-3 py-1 rounded-full text-xs font-semibold">Dashboard</span>
            </div>
          </div>
          {/* Items Sold */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-[#4F46E5] mb-4">Your Listed Items</h3>
            {soldItems.length === 0 ? (
              <p className="text-[#64748b]">You haven't listed any items yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {soldItems.map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center border hover:shadow-lg transition">
                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                    <h4 className="font-bold text-[#0F172A] mb-1">{item.name}</h4>
                    <p className="text-[#4F46E5] font-semibold mb-1">₹{item.price}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Sold" ? "bg-[#22D3EE]/20 text-[#22D3EE]" : "bg-[#4F46E5]/10 text-[#4F46E5]"}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
          {/* Items Purchased */}
          <section>
            <h3 className="text-xl font-semibold text-[#22D3EE] mb-4">Your Purchased Items</h3>
            {purchasedItems.length === 0 ? (
              <p className="text-[#64748b]">You haven't purchased any items yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {purchasedItems.map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center border hover:shadow-lg transition">
                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                    <h4 className="font-bold text-[#0F172A] mb-1">{item.name}</h4>
                    <p className="text-[#22D3EE] font-semibold">₹{item.price}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-lg py-10 px-4 mt-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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

export default UserDashBoard;

/*
Add to your CSS or Tailwind config for the slow spin:
@layer utilities {
  .animate-spin-slow {
    animation: spin 8s linear infinite;
  }
}
*/
