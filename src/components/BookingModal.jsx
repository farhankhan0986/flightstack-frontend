import { useState } from "react";
import { bookFlight } from "../api/api";
import { X, Plane, User } from "lucide-react";

const BookingModal = ({ flight, userId, onClose, onSuccess }) => {
  const [passengerName, setPassengerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (!passengerName.trim()) {
      setError("Passenger name is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await bookFlight({
        flight_id: flight.flight_id,
        passenger_name: passengerName,
        user_id: userId,
      });

      onSuccess(result);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Confirm Booking</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{flight.departure_time}</div>
              <div className="text-sm text-brand-200">{flight.departure_city}</div>
            </div>
            <div className="flex-1 flex flex-col items-center px-4">
              <Plane className="w-5 h-5 rotate-90 text-brand-200" />
              <div className="w-full border-t border-dashed border-white/30 mt-1" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{flight.arrival_time}</div>
              <div className="text-sm text-brand-200">{flight.arrival_city}</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
            <div>
              <span className="inline-flex items-center px-2.5 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-lg">
                {flight.airline}
              </span>
              <span className="text-xs text-gray-400 font-mono ml-2">{flight.flight_id}</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">₹{(flight.current_price ?? 0).toLocaleString()}</div>
              <div className="text-xs text-gray-400">per person</div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Passenger Name
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                <User className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter full name"
                className="input-field pl-10"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Booking...
                </span>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
