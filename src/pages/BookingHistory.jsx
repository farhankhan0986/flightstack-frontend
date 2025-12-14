import { useEffect, useState } from "react";
import { getBookings } from "../api/api";
const BookingHistory = ({ userId, onBack }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings(userId);
        setBookings(data.bookings || []);
      } catch (err) {
        setError("Failed to load booking history");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={onBack}
        style={{backgroundColor:"#034f84",borderRadius:"10px"}}
        className="bg-blue-600 text-white px-3 py-2 rounded"
      >
        Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Booking History</h2>

      {loading && <p>Loading bookings...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && bookings.length === 0 && (
        <p className="text-gray-500">No bookings found</p>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.pnr}
            style={{borderRadius:"20px", backgroundColor:"#e4ebed"}}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {b.airline} ({b.flight_id})
              </p>
              <p className="text-sm text-gray-600">
                {b.departure_city} → {b.arrival_city}
              </p>
              <p className="text-sm">
                PNR: <span className="font-medium">{b.pnr}</span>
              </p>
              <p className="text-sm">
                Amount Paid: ₹{b.amount_paid}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(b.booking_date).toLocaleString()}
              </p>
            </div>

            <a
              href={`https://flightstack-backend.onrender.com${b.ticket_pdf_path}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{backgroundColor:"#034f84", borderRadius:"10px"}}
              className="bg-blue-600 text-white px-3 py-2 rounded"
            >
              Download Ticket
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
