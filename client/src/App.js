import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Make sure these file names match your actual files in src/pages/
import Home from './pages/Home';
import BookingForm from './pages/BookingForm';
import MyPets from './pages/MyPets';
import Dashboard from './pages/Dashboard';

// 2. Import your CSS
import './App.css';

function App() {
  return (
    <div className="App">
      <nav style={{ padding: "10px", background: "#eee" }}>
        <a href="/">Home</a> | <a href="/book">Book</a> | <a href="/pets">My Pets</a> | <a href="/dashboard">Dashboard</a>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/pets" element={<MyPets />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        
        {/* This catch-all helps if you go to a wrong URL */}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;