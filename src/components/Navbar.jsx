import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plane, Menu, X, Wallet, User, History } from "lucide-react";

const Navbar = ({ accountName, wallet, onToggleHistory, showHistory }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isApp = location.pathname === "/app";

  return (
    <nav className="sticky top-0 z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Flight<span className="gradient-text">Stack</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {isLanding && (
              <>
                <a href="#features" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors rounded-lg hover:bg-brand-50">
                  Features
                </a>
                <a href="#about" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors rounded-lg hover:bg-brand-50">
                  About
                </a>
                <a href="#pricing" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors rounded-lg hover:bg-brand-50">
                  Pricing
                </a>
                <Link to="/app" className="btn-primary ml-2">
                  Book Flights →
                </Link>
              </>
            )}
            {isApp && (
              <>
                <button
                  onClick={onToggleHistory}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    showHistory
                      ? "bg-brand-50 text-brand-700"
                      : "text-gray-600 hover:text-brand-600 hover:bg-brand-50"
                  }`}
                >
                  <History className="w-4 h-4" />
                  {showHistory ? "Back to Search" : "Booking History"}
                </button>
                <div className="h-8 w-px bg-gray-200 mx-2" />
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-100">
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm font-semibold">₹{wallet?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{accountName || "User"}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-gray-100 animate-fade-in">
            {isLanding && (
              <div className="flex flex-col gap-1">
                <a href="#features" className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-brand-600 rounded-lg hover:bg-brand-50" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#about" className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-brand-600 rounded-lg hover:bg-brand-50" onClick={() => setMobileMenuOpen(false)}>About</a>
                <a href="#pricing" className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-brand-600 rounded-lg hover:bg-brand-50" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                <Link to="/app" className="btn-primary text-center mt-2" onClick={() => setMobileMenuOpen(false)}>Book Flights →</Link>
              </div>
            )}
            {isApp && (
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{accountName || "User"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm font-semibold">₹{wallet?.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => { onToggleHistory(); setMobileMenuOpen(false); }}
                  className="mx-4 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-brand-50 text-brand-700"
                >
                  <History className="w-4 h-4" />
                  {showHistory ? "Back to Search" : "Booking History"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
