import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Make sure this import is correct!
import MyPets from "./pages/MyPets";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5555/check_session", { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          res.json().then((user) => setUser(user));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading PawsStay...</h1>;

  // If no user is logged in, show the Login page
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="App">
      <NavBar user={user} onLogout={() => setUser(null)} />
      <Routes>
        {/* These paths must match the "to" attributes in your NavBar Links */}
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/pets" element={<MyPets />} />
        
        {/* This handles the base URL and redirects to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        {/* Catch-all for typos - redirects back to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;