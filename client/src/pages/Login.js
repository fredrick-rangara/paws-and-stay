import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE = "https://paws-and-stay.onrender.com";

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => onLogin(user));
      } else {
        alert("Login failed! Check your credentials.");
      }
    });
  }

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>PawsStay Login 🐾</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;