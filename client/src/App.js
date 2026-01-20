import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import PetDashboard from './pages/PetDashboard';
import BookingForm from './pages/BookingForm';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-pets" element={<PetDashboard />} />
          <Route path="/book-sitter" element={<BookingForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;