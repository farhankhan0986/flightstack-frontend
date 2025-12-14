# ✈️ FlightStack — Full Stack Flight Booking System

FlightStack is a **production-ready, full-stack flight booking application** built as part of the **XTechon Full-Stack Developer Technical Assignment**.

It demonstrates **real-world backend engineering**, including database-driven workflows, dynamic pricing logic, wallet management, PDF ticket generation, and a modern, responsive frontend.

---

## 🌐 Live Demo

**Frontend (Vercel)**  
🔗 https://flightstack-frontend.vercel.app/

**Backend (Render)**  
🔗 https://flightstack-backend.onrender.com

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- JavaScript (ES6+)
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

### Utilities & Tools
- PDFKit (PDF ticket generation)
- UUID / Crypto (PNR generation)
- MongoDB TTL Index (automatic cleanup)
- Render (Backend deployment)
- Vercel (Frontend deployment)

---

## ✨ Features

### ✅ Core Features

#### 🔍 Database-Driven Flight Search
- Flights fetched directly from **MongoDB**
- No static JSON or external APIs
- Search by **departure** and **arrival** city

#### 📈 Dynamic Surge Pricing Engine
- If a flight receives **3 booking attempts within 5 minutes**:
  - Price increases by **10%**
- Surge **automatically resets after 10 minutes**
- UI displays:
  - Surge active indicator
  - Live countdown timer

#### 💰 Wallet System
- Default wallet balance: **₹50,000**
- **Atomic wallet deduction** during booking
- Validation for insufficient balance

#### 🧾 Ticket PDF Generation
- Auto-generated **PDF ticket** after successful booking
- Ticket includes:
  - Passenger name
  - Airline & Flight ID
  - Route (From → To)
  - Final price paid
  - Booking date & time
  - Unique PNR
- Ticket can be **re-downloaded anytime**

#### 📚 Booking History
- View complete booking history
- Displays flight details, amount paid, booking date, and PNR
- Download tickets again from history

---

### 🌟 Bonus Enhancements
- Sort flights by price (Low → High, High → Low)
- Filter by airline
- Filter by time of day (Morning / Afternoon / Evening / Night)
- Visual surge countdown timer (proof of pricing logic)
- Fully responsive UI (desktop & mobile)
- Clean, modular backend architecture
- Live production deployment

---

## ⚙️ Surge Pricing Logic (How It Works)

- Every booking attempt is recorded in a **BookingAttempt** collection
- If **3 attempts occur for the same flight within 5 minutes**:
  - `current_price = base_price × 1.1`
  - `surge_expires_at = now + 10 minutes`
- A background check resets the price automatically after surge expiry

**UI Indicators:**
- “Surge Active” badge
- Countdown timer until surge ends

This closely mimics **real airline surge pricing behavior**.

---

## 📂 Project Structure

### Backend
```
backend/
├─ controllers/
│  ├─ Flight.js
│  ├─ Booking.js
│  └─ User.js
├─ models/
│  ├─ Flight.js
│  ├─ Booking.js
│  ├─ User.js
│  └─ BookingAttempt.js
├─ routes/
│  ├─ Flight.js
│  ├─ Booking.js
│  └─ User.js
├─ utils/
│  ├─ pdf.js
│  └─ pnr.js
├─ scripts/
│  └─ seedFlights.js
├─ tickets/
├─ server.js
└─ package.json
```

### Frontend
```
frontend/
├─ public/
│  ├─ favicon.ico
│  └─ favicon-32x32.png
├─ src/
│  ├─ api/
│  │  └─ api.js
│  ├─ components/
│  │  ├─ FlightCard.jsx
│  │  └─ BookingModal.jsx
│  ├─ pages/
│  │  ├─ SearchFlights.jsx
│  │  └─ BookingHistory.jsx
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
└─ package.json
```

---

## 🧑‍💻 Local Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev
```

Create `.env` file:
```
MONGO_URI=your_mongodb_connection_string
PORT=4000
```

Seed database:
```bash
npm run seed
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Create `.env` file:
```
VITE_API_BASE=http://localhost:4000/api
```

---

## 🧪 Sample API Endpoints

- `GET /api/flights`
- `GET /api/flights?departure=DELHI&arrival=MUMBAI`
- `POST /api/booking`
- `GET /api/booking?user_id=...`
- `GET /api/users/:id`
- `GET /tickets/:pnr.pdf`

---

## 🚀 Future Improvements
- Authentication (Login / Register)
- Multi-user support
- Payment gateway integration
- Admin dashboard
- Dockerized deployment

---

## 👤 Author

**Farhan Abid**  
Full-Stack Developer  
🔗 GitHub: https://github.com/farhankhan0986
🔗 e-mail: farhankhan080304@gmail.com


---

## 🏁 Final Note

This project emphasizes **real-world backend logic, scalability, and production readiness**, not just UI.

It showcases the ability to **design, build, and deploy a complete end-to-end system**, closely resembling real industry-grade applications.

