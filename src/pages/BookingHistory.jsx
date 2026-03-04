import { useEffect, useState } from "react";
import { getBookings } from "../api/api";
import { ArrowLeft, Download, Ticket, Calendar, CreditCard } from "lucide-react";

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="btn-secondary flex items-center gap-2 px-3 py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Booking History</h2>
          <p className="text-sm text-gray-500">Your past flight bookings</p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
            <span className="text-gray-500 text-sm">Loading bookings...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      {!loading && bookings.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Ticket className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-lg font-medium text-gray-500">No bookings yet</p>
          <p className="text-sm">Your booked flights will appear here</p>
        </div>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.pnr}
            className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-lg">
                  {b.airline}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {b.flight_id}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-900 font-medium mt-1">
                <span>{b.departure_city}</span>
                <span className="text-gray-400">→</span>
                <span>{b.arrival_city}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Ticket className="w-3.5 h-3.5" />
                  PNR: <span className="font-semibold text-gray-700">{b.pnr}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <CreditCard className="w-3.5 h-3.5" />
                  ₹{b.amount_paid?.toLocaleString()}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(b.booking_date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <a
              href={`https://flightstack-backend.onrender.com${b.ticket_pdf_path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              Download Ticket
            </a>
          </div>
        ))}
      </div>

      {bookings.length > 0 && (
        <div className="text-center mt-6">
          <span className="text-sm text-gray-400">
            {bookings.length} booking{bookings.length !== 1 ? "s" : ""} total
          </span>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
