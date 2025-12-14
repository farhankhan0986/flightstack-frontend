const API_BASE = import.meta.env.VITE_API_BASE;

if (!API_BASE) {
  console.error(" VITE_API_BASE is undefined");
}

export const getFlights = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/flights?${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch flights");
  }

  return res.json();
};

export const getUserById = async (user_id) => {
  const res = await fetch(`${API_BASE}/users/${user_id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
};

export const bookFlight = async (data) => {
  const res = await fetch(`${API_BASE}/booking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Booking failed");
  }

  return result;
};

export const getBookings = async (user_id) => {
  const res = await fetch(`${API_BASE}/booking?user_id=${user_id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return res.json();
};
