import { useState, useEffect } from "react";
import { getFlights } from "../api/api";
import FlightCard from "../components/FlightCard";
import { Search, SlidersHorizontal, Plane } from "lucide-react";

const SearchFlights = ({ onBook }) => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [flights, setFlights] = useState([]);
  const [displayFlights, setDisplayFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [timeFilter, setTimeFilter] = useState("ALL");
  const [sortOption, setSortOption] = useState("");
  const [airlineFilter, setAirlineFilter] = useState("");

  const fetchFlights = async (params = {}) => {
    setError("");
    setLoading(true);
    try {
      const data = await getFlights(params);
      const result = data.allFlights || data.flights || [];
      setFlights(result);
      setDisplayFlights(result);
    } catch (err) {
      setError("Failed to fetch flights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const isWithinTimeRange = (time, filter) => {
    if (filter === "ALL") return true;

    const [h, m] = time.split(":").map(Number);
    const minutes = h * 60 + m;

    switch (filter) {
      case "MORNING":
        return minutes >= 300 && minutes < 720;
      case "AFTERNOON":
        return minutes >= 720 && minutes < 1020; 
      case "EVENING":
        return minutes >= 1020 && minutes < 1260;
      case "NIGHT":
        return minutes >= 1260 || minutes < 300; 
      default:
        return true;
    }
  };

  useEffect(() => {
    let updated = [...flights];

    if (airlineFilter) {
      updated = updated.filter(
        (flight) => flight.airline === airlineFilter
      );
    }
    updated = updated.filter((flight) =>
      isWithinTimeRange(flight.departure_time, timeFilter)
    );

    if (sortOption === "low-high") {
      updated.sort((a, b) => a.current_price - b.current_price);
    } else if (sortOption === "high-low") {
      updated.sort((a, b) => b.current_price - a.current_price);
    }

    setDisplayFlights(updated);
  }, [flights, airlineFilter, timeFilter, sortOption]);

  const handleSearch = () => {
    fetchFlights({
      departure,
      arrival,
    });
  };

  const airlines = [...new Set(flights.map((f) => f.airline))];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Section */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center">
            <Search className="w-4 h-4 text-brand-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Search Flights</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <Plane className="w-4 h-4 text-gray-400 -rotate-45" />
            </div>
            <input
              type="text"
              placeholder="Departure City"
              className="input-field pl-10"
              value={departure}
              onChange={(e) => setDeparture(e.target.value.toUpperCase())}
            />
          </div>
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <Plane className="w-4 h-4 text-gray-400 rotate-45" />
            </div>
            <input
              type="text"
              placeholder="Arrival City"
              className="input-field pl-10"
              value={arrival}
              onChange={(e) => setArrival(e.target.value.toUpperCase())}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 sm:w-auto w-full"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-600">Filters</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="select-field"
          >
            <option value="ALL">All Times</option>
            <option value="MORNING">Morning (5 AM – 12 PM)</option>
            <option value="AFTERNOON">Afternoon (12 PM – 5 PM)</option>
            <option value="EVENING">Evening (5 PM – 9 PM)</option>
            <option value="NIGHT">Night (9 PM – 5 AM)</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select-field"
          >
            <option value="">Sort by Price</option>
            <option value="low-high">Low → High</option>
            <option value="high-low">High → Low</option>
          </select>

          <select
            value={airlineFilter}
            onChange={(e) => setAirlineFilter(e.target.value)}
            className="select-field"
          >
            <option value="">All Airlines</option>
            {airlines.map((airline) => (
              <option key={airline} value={airline}>
                {airline}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
            <span className="text-gray-500 text-sm">Searching flights...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}
      {!loading && displayFlights.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Plane className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-lg font-medium text-gray-500">No flights found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      <div className="grid gap-4">
        {displayFlights.map((flight) => (
          <FlightCard
            key={flight.flight_id}
            flight={flight}
            onBook={onBook}
          />
        ))}
      </div>

      {displayFlights.length > 0 && (
        <div className="text-center mt-6">
          <span className="text-sm text-gray-400">
            Showing {displayFlights.length} flight{displayFlights.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchFlights;
