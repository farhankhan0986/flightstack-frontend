import { Plane } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Flight<span className="text-brand-400">Stack</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Modern flight booking platform with real-time pricing, surge alerts, and instant e-tickets.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link to="/app" className="text-sm hover:text-brand-400 transition-colors">Search Flights</Link></li>
              <li><a href="#features" className="text-sm hover:text-brand-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-sm hover:text-brand-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-sm hover:text-brand-400 transition-colors">About</a></li>
              <li><a href="#" className="text-sm hover:text-brand-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm hover:text-brand-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-brand-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-brand-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:text-brand-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FlightStack. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built with ❤️ for modern travelers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
