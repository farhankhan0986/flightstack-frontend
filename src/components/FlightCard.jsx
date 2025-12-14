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
    <div
      style={{ backgroundColor: "#e4ebed", borderRadius: "20px" }}
      className="border p-4 flex justify-between items-center"
    >
      <div className=" flex flex-col justify-between ">
        <h2 style={{ }} className="font-semibold">
          {flight.airline} ({flight.flight_id})
        </h2>

        <p style={{}} className="text-sm text-green-600">
          {flight.departure_city} → {flight.arrival_city}
        </p>
        <p style={{ backgroundColor: "#e4ebed", fontSize:'17px' }} className="text-sm font-bold text-gray-600 mt-1">
           {flight.departure_time} → {flight.arrival_time}

           {}{} ({getDuration(flight.departure_time, flight.arrival_time)})
        </p>
        

        <p style={{ }} className="mt-1">
          Price: ₹
          <span className={`font-bold ${isSurgeActive ? "text-red-600" : ""}`}>
            {flight.current_price}
          </span>
          {isSurgeActive && (
            <span className="text-red-600 text-sm ml-2">[ Surge Active ]</span>
          )}
        </p>
        <span className="text-xs text-gray-500 ml-2">
</span>


        {isSurgeActive && timeLeft && (
          <p className="text-xs text-red-500 mt-1">Surge ends in {timeLeft}</p>
        )}
      </div>

      <button
        style={{ backgroundColor: "#034f84", borderRadius: "10px" }}
        onClick={() => onBook(flight)}
        className="text-white px-4 py-2 hover:opacity-90 transition"
      >
        Book
      </button>
    </div>
  );
};

export default FlightCard;
