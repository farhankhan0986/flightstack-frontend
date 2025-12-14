import { useState } from "react";
import { bookFlight } from "../api/api";

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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>

        <div className="mb-3">
          <p className="font-medium">
            {flight.airline} ({flight.flight_id})
          </p>
          <p className="text-sm text-gray-600">
            {flight.departure_city} → {flight.arrival_city}
          </p>
          <p className="mt-1">
            Price: ₹<span className="font-semibold">{flight.current_price}</span>
          </p>
        </div>

        <input
          type="text"
          placeholder="Passenger Name"
          className="border p-2 rounded w-full mb-3"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {loading ? "Booking..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
