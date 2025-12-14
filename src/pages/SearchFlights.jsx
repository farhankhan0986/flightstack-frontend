import { useState, useEffect } from "react";
import { getFlights } from "../api/api";
import FlightCard from "../components/FlightCard";

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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Flights</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Departure City"
          className="border p-2 w-full"
          style={{ backgroundColor: "#e4ebed", borderRadius: "10px" }}
          value={departure}
          onChange={(e) => setDeparture(e.target.value.toUpperCase())}
        />
        <input
          type="text"
          placeholder="Arrival City"
          className="border p-2 w-full"
          style={{ backgroundColor: "#e4ebed", borderRadius: "10px" }}
          value={arrival}
          onChange={(e) => setArrival(e.target.value.toUpperCase())}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="text-white px-4 disabled:opacity-50"
          style={{ backgroundColor: "#034f84", borderRadius: "10px" }}
        >
          Search
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="border p-2 rounded"
          style={{ backgroundColor: "#e4ebed", borderRadius: "10px" }}
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
          className="border p-2 rounded"
          style={{ backgroundColor: "#e4ebed", borderRadius: "10px" }}
        >
          <option value="">Sort by Price</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>

        <select
          value={airlineFilter}
          onChange={(e) => setAirlineFilter(e.target.value)}
          className="border p-2 rounded"
          style={{ backgroundColor: "#e4ebed", borderRadius: "10px" }}
        >
          <option value="">All Airlines</option>
          {airlines.map((airline) => (
            <option key={airline} value={airline}>
              {airline}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading flights...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && displayFlights.length === 0 && (
        <p className="text-gray-500">No flights found</p>
      )}

      <div className="grid gap-4 mt-4">
        {displayFlights.map((flight) => (
          <FlightCard
            key={flight.flight_id}
            flight={flight}
            onBook={onBook}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchFlights;
