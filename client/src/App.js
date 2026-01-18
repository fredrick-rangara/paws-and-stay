import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Updated imports
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyPets from "./pages/MyPets";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/check_session").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading PawsStay...</h1>;

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="App">
      <NavBar user={user} onLogout={() => setUser(null)} />
      {/* In v6, Switch is now Routes */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        
        <Route path="/pets" element={<MyPets />} />

        {/* In v6, Redirect is now Navigate */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        {/* Catch-all: if route doesn't exist, go to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;