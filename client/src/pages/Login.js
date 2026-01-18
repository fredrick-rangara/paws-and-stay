import React, { useState } from "react";

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });

  function handleSubmit(e) {
    e.preventDefault();
    const url = isLogin ? "/login" : "/signup";
    fetch(`http://localhost:5555${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) res.json().then(onLogin);
      else alert("Authentication failed");
    });
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-grid", gap: "10px" }}>
        <input placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
        {!isLogin && <input placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />}
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
        {isLogin ? "Create an account" : "Back to login"}
      </p>
    </div>
  );
}

export default Login;