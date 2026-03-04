import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingHistory from "./pages/BookingHistory";
import SearchFlights from "./pages/SearchFlights";
import LandingPage from "./pages/LandingPage";
import BookingModal from "./components/BookingModal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getUserById } from "./api/api";

const DEMO_USER_ID = "693e866700810bb3b7e3103d";

function AppDashboard() {
  const [accountName, setAccountName] = useState("");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [wallet, setWallet] = useState(() => {
    const savedWallet = localStorage.getItem("wallet_balance");
    return savedWallet ? Number(savedWallet) : 50000;
  });

  const [showHistory, setShowHistory] = useState(false);
  const [lastPNR, setLastPNR] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {

        const cachedName = localStorage.getItem("account_holder_name");
        const cachedWallet = localStorage.getItem("wallet_balance");

        if (cachedName) setAccountName(cachedName);
        if (cachedWallet) setWallet(Number(cachedWallet));

        const data = await getUserById(DEMO_USER_ID);

        setAccountName(data.user.name);
        setWallet(data.user.wallet_balance);

        localStorage.setItem("account_holder_name", data.user.name);
        localStorage.setItem("wallet_balance", data.user.wallet_balance);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  const handleBookClick = (flight) => {
    setSelectedFlight(flight);
  };

  const handleBookingSuccess = ({ booking, wallet_balance }) => {
    setWallet(wallet_balance);
    localStorage.setItem("wallet_balance", wallet_balance);
    setLastPNR(booking.pnr);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        accountName={accountName}
        wallet={wallet}
        onToggleHistory={() => setShowHistory(!showHistory)}
        showHistory={showHistory}
      />

      <main className="flex-1">
        {lastPNR && !showHistory && (
          <div className="max-w-5xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl animate-fade-in">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Booking confirmed!</span>{" "}
                PNR: <span className="font-bold">{lastPNR}</span>
              </div>
            </div>
          </div>
        )}

        {showHistory ? (
          <BookingHistory
            userId={DEMO_USER_ID}
            onBack={() => setShowHistory(false)}
          />
        ) : (
          <SearchFlights onBook={handleBookClick} />
        )}
      </main>

      <Footer />

      {selectedFlight && (
        <BookingModal
          flight={selectedFlight}
          userId={DEMO_USER_ID}
          onClose={() => setSelectedFlight(null)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
