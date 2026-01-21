import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import PetDashboard from './pages/PetDashboard';
import BookingForm from './pages/BookingForm';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      fetch('/check_session', {
        headers: { "Authorization": `Bearer ${token}` }
      })
      .then(res => res.ok ? res.json().then(setUser) : localStorage.removeItem('jwt'));
    }
  }, []);

  return (
    <div className="App">
      {/* The Navbar now has access to the user state to show Login/Logout */}
      <Navbar user={user} setUser={setUser} />
      
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/pets" element={<PetDashboard user={user} />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/" element={
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Welcome to PawsStay!</h1>
                <p>Please use the links above to Login or Sign Up.</p>
            </div>
        } />
      </Routes>
    </div>
  );
}

export default App;