import { useEffect, useState } from "react";

const FlightCard = ({ flight, onBook }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  const isSurgeActive =
    flight.surge_expires_at && new Date(flight.surge_expires_at) > new Date();

  useEffect(() => {
    if (!isSurgeActive) {
      setTimeLeft(null);
      return;
    }

    const updateTimer = () => {
      const now = new Date();
      const expiry = new Date(flight.surge_expires_at);
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [flight.surge_expires_at, isSurgeActive]);

  const getDuration = (start, end) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    const startMinutes = sh * 60 + sm;
    const endMinutes = eh * 60 + em;

    let diff = endMinutes - startMinutes;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-100 group">
      {/* Flight Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center px-2.5 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-lg">
            {flight.airline}
          </span>
          <span className="text-xs text-gray-400 font-mono">
            {flight.flight_id}
          </span>
        </div>

        {/* Route & Time */}
        <div className="flex items-center gap-3 mt-3">
          <div>
            <div className="text-xl font-bold text-gray-900">{flight.departure_time}</div>
            <div className="text-xs text-gray-500 mt-0.5">{flight.departure_city}</div>
          </div>

          <div className="flex-1 flex flex-col items-center px-2">
            <span className="text-xs text-gray-400 font-medium mb-1">
              {getDuration(flight.departure_time, flight.arrival_time)}
            </span>
            <div className="w-full h-px bg-gray-200 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-500" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-500" />
            </div>
            <span className="text-xs text-gray-400 mt-1">Direct</span>
          </div>

          <div className="text-right">
            <div className="text-xl font-bold text-gray-900">{flight.arrival_time}</div>
            <div className="text-xs text-gray-500 mt-0.5">{flight.arrival_city}</div>
          </div>
        </div>

        {/* Surge Warning */}
        {isSurgeActive && timeLeft && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-lg border border-red-100">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            Surge ends in {timeLeft}
          </div>
        )}
      </div>

      {/* Price & Book */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:min-w-[140px]">
        <div className="text-right">
          <div className={`text-2xl font-bold ${isSurgeActive ? "text-red-600" : "text-gray-900"}`}>
            ₹{flight.current_price?.toLocaleString()}
          </div>
          {isSurgeActive && (
            <span className="text-xs text-red-500 font-medium">Surge Active</span>
          )}
          <div className="text-xs text-gray-400">per person</div>
        </div>
        <button
          onClick={() => onBook(flight)}
          className="btn-primary mt-1 text-sm px-5 py-2"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
