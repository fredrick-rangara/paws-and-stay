import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import MyPets from "./pages/MyPets";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5555/check_session", { credentials: "include" })
      .then((res) => {
        if (res.ok) res.json().then((u) => setUser(u));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} onLogout={() => setUser(null)} />
      <Routes>
        <Route path="/pets" element={<MyPets />} />
        <Route path="/" element={<h1>Welcome to PawsStay, {user.username}!</h1>} />
      </Routes>
    </>
  );
}

export default App;