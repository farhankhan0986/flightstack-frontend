import { Link } from "react-router-dom";
import {
  Plane,
  Search,
  TrendingUp,
  Shield,
  Zap,
  CreditCard,
  Clock,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-brand-50/30" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 lg:pt-32 lg:pb-40">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 border border-brand-100 rounded-full text-brand-700 text-sm font-medium mb-8 animate-fade-in">
              <Zap className="w-4 h-4" />
              Real-time surge pricing alerts
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight animate-slide-up">
              Book Flights{" "}
              <span className="gradient-text">Smarter,</span>
              <br />
              Not Harder
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-slide-up">
              FlightStack helps you find the best deals with real-time pricing,
              smart surge alerts, and instant e-tickets — all in one modern
              platform.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Link
                to="/app"
                className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30"
              >
                Start Booking <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="btn-secondary text-base px-8 py-3.5"
              >
                See How It Works
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-500 mt-1">Routes</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-500 mt-1">Bookings</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-500 mt-1">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-100 rounded-full text-brand-600 text-sm font-medium mb-4">
              <Star className="w-3.5 h-3.5" />
              Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything you need to{" "}
              <span className="gradient-text">fly smart</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              From search to boarding pass — we&apos;ve got every step covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                title: "Smart Search",
                description:
                  "Search by cities, filter by time, airline, and sort by price to find the perfect flight in seconds.",
              },
              {
                icon: TrendingUp,
                title: "Surge Pricing Alerts",
                description:
                  "Real-time surge price monitoring with countdown timers. Know exactly when prices will drop.",
              },
              {
                icon: CreditCard,
                title: "Instant Wallet",
                description:
                  "Built-in wallet system for lightning-fast bookings. No credit card needed.",
              },
              {
                icon: Zap,
                title: "One-Click Booking",
                description:
                  "Book your flight with a single click. Get your PNR and e-ticket instantly.",
              },
              {
                icon: Shield,
                title: "Secure Transactions",
                description:
                  "Every transaction is protected. Your payments and personal data are always safe.",
              },
              {
                icon: Clock,
                title: "Booking History",
                description:
                  "Access all your past bookings, download tickets, and track your travel history.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card p-6 group hover:border-brand-100"
              >
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                  <feature.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-100 rounded-full text-brand-600 text-sm font-medium mb-4">
                <Plane className="w-3.5 h-3.5" />
                About FlightStack
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Built for the{" "}
                <span className="gradient-text">modern traveler</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                FlightStack is a next-generation flight booking platform
                designed to make air travel accessible, transparent, and
                affordable. We combine real-time data with smart algorithms to
                help you make the best booking decisions.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time price tracking across all airlines",
                  "Transparent surge pricing with countdown timers",
                  "Instant e-ticket generation with PDF download",
                  "Secure wallet-based payment system",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl p-8 text-white shadow-2xl shadow-brand-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">FlightStack Demo</div>
                    <div className="text-sm text-brand-200">Live Preview</div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-5 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-brand-100">DEL → BOM</span>
                    <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">IndiGo</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-2xl font-bold">06:00</div>
                      <div className="text-xs text-brand-200">Delhi</div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="border-t border-dashed border-white/30 relative">
                        <Plane className="w-4 h-4 absolute -top-2 left-1/2 -translate-x-1/2 rotate-90" />
                      </div>
                      <div className="text-xs text-center text-brand-200 mt-1">2h 15m</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">08:15</div>
                      <div className="text-xs text-brand-200">Mumbai</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">₹4,299</span>
                  <span className="bg-white text-brand-600 px-4 py-2 rounded-xl text-sm font-semibold">
                    Book Now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-100 rounded-full text-brand-600 text-sm font-medium mb-4">
              <CreditCard className="w-3.5 h-3.5" />
              Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Simple, <span className="gradient-text">transparent</span> pricing
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              No hidden fees. No booking charges. Pay only for your flights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "Perfect for trying out FlightStack",
                features: [
                  "Search all flights",
                  "Basic filters",
                  "Email confirmations",
                  "₹50,000 demo wallet",
                ],
                cta: "Get Started",
                highlighted: false,
              },
              {
                name: "Pro",
                price: "₹499/mo",
                description: "For frequent travelers who want more",
                features: [
                  "Everything in Starter",
                  "Surge price alerts",
                  "Priority booking",
                  "Advanced filters",
                  "Booking analytics",
                ],
                cta: "Start Free Trial",
                highlighted: true,
              },
              {
                name: "Business",
                price: "Custom",
                description: "For teams and corporate travel",
                features: [
                  "Everything in Pro",
                  "Team management",
                  "Expense reports",
                  "API access",
                  "Dedicated support",
                ],
                cta: "Contact Sales",
                highlighted: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-2xl shadow-brand-500/25 scale-105 border-0"
                    : "card border border-gray-100"
                }`}
              >
                <h3
                  className={`text-lg font-semibold ${
                    plan.highlighted ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mt-4 mb-2">
                  <span
                    className={`text-4xl font-bold ${
                      plan.highlighted ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                </div>
                <p
                  className={`text-sm mb-6 ${
                    plan.highlighted ? "text-brand-200" : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 ${
                          plan.highlighted
                            ? "text-brand-300"
                            : "text-brand-500"
                        }`}
                      />
                      <span
                        className={
                          plan.highlighted ? "text-brand-100" : "text-gray-600"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/app"
                  className={`block text-center py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-white text-brand-700 hover:bg-brand-50 shadow-lg"
                      : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to <span className="gradient-text">take off?</span>
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of smart travelers who book their flights with
            FlightStack. Start with a free demo wallet of ₹50,000.
          </p>
          <Link
            to="/app"
            className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4 shadow-lg shadow-brand-500/25"
          >
            <Plane className="w-5 h-5" />
            Start Booking Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
