import { useState, useEffect } from "react";
import BookingHistory from "./pages/BookingHistory";
import SearchFlights from "./pages/SearchFlights";
import BookingModal from "./components/BookingModal";
import { getUserById } from "./api/api";

const DEMO_USER_ID = "693e866700810bb3b7e3103d";

function App() {
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
    <div style={{ backgroundColor: "" }} className="min-h-screen  bg-gray-100">
      <header
        style={{ backgroundColor: "" }}
        className=" shadow p-4 flex justify-between items-center"
      >
        <h1
          className="text-3xl font-bold tracking-wide text-gray-900"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          Flight
          <span style={{ color: "#034f84" }} className="text-blue-700">
            Stack
          </span>
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            style={{ backgroundColor: "#034f84", borderRadius: "10px" }}
            className="px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            {showHistory ? "Back to Search" : "Booking History"}
          </button>

          <div className="flex flex-col items-end">
            <span
              style={{ position: "relative", left: "-14px" }}
              className="text-sm text-gray-600"
            >
              👤 {accountName || "User"}
            </span>
            <span className="font-medium">Wallet: ₹{wallet}</span>
          </div>
        </div>
      </header>

      {lastPNR && !showHistory && (
        <div className="max-w-4xl mx-auto mt-4 bg-green-100 border border-green-300 text-green-800 p-3 rounded">
          Booking successful! PNR: <span className="font-bold">{lastPNR}</span>
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

export default App;
