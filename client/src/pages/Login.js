import React, { useState } from "react";

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // Endpoint changes based on whether we are logging in or signing up
    const endpoint = isLogin ? "/login" : "/signup";
    
    // Construct the data object to send
    const formData = isLogin 
      ? { username, password } 
      : { username, email, password };

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((user) => onLogin(user));
        } else {
          res.json().then((err) => setError(err.error || "Something went wrong"));
        }
      })
      .catch(() => setError("Server is down. Check your Flask terminal!"));
  }

  return (
    <div className="login-container" style={styles.container}>
      <div style={styles.card}>
        <h1>{isLogin ? "🐾 Paws & Stay Login" : "🐾 Join Paws & Stay"}</h1>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
            style={styles.input}
          />

          {!isLogin && (
            <>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
                style={styles.input}
              />
            </>
          )}

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <p style={{ marginTop: "20px" }}>
          {isLogin ? "New to Paws & Stay?" : "Already have an account?"}
          <button 
            onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
            }} 
            style={styles.toggleBtn}
          >
            {isLogin ? "Sign Up here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}

// Simple inline styles to make it look decent immediately
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  card: {
    padding: "40px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "350px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#ff6b6b",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px"
  },
  toggleBtn: {
    background: "none",
    border: "none",
    color: "#007bff",
    textDecoration: "underline",
    cursor: "pointer",
    marginLeft: "5px"
  },
  error: {
    color: "red",
    marginTop: "10px",
    fontSize: "14px"
  }
};

export default Login;