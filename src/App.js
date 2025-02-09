import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TripDashboard from './pages/TripDashboard';
import Header from './components/Header';
import CalendarPage from './pages/CalendarPage';
import BookingsPage from './pages/BookingsPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<TripDashboard />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
