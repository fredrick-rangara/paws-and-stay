import React, { useState } from "react";

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const url = isLogin ? "/login" : "/signup";
    
    fetch(`http://localhost:5555${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) res.json().then(onLogin);
      else setError("Invalid username or password. Please try again.");
    });
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginBox}>
        {/* Left Side: Image/Branding */}
        <div style={styles.imageSide}>
          <div style={styles.imageOverlay}>
            <h1 style={styles.logoText}>PawsStay 🐾</h1>
            <p style={styles.imageTagline}>Where every tail finds a home and every sitter finds a friend.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={styles.formSide}>
          <div style={styles.formContent}>
            <h2 style={styles.formHeader}>{isLogin ? "Welcome Back" : "Join the Family"}</h2>
            <p style={styles.formSubtext}>
              {isLogin ? "Please enter your details to sign in." : "Create an account to start sitting or booking."}
            </p>

            {error && <p style={styles.errorText}>{error}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Username</label>
                <input 
                  style={styles.input}
                  placeholder="Enter your username" 
                  onChange={(e) => setFormData({...formData, username: e.target.value})} 
                  required
                />
              </div>

              {!isLogin && (
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input 
                    style={styles.input}
                    type="email"
                    placeholder="name@example.com" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    required
                  />
                </div>
              )}

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input 
                  style={styles.input}
                  type="password" 
                  placeholder="••••••••" 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  required
                />
              </div>

              <button type="submit" style={styles.submitBtn}>
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p style={styles.toggleText}>
              {isLogin ? "Don't have an account?" : "Already a member?"} 
              <span onClick={() => setIsLogin(!isLogin)} style={styles.toggleLink}>
                {isLogin ? " Sign Up" : " Log In"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fcf9f7",
    padding: "20px"
  },
  loginBox: {
    display: "flex",
    width: "1000px",
    height: "650px",
    backgroundColor: "white",
    borderRadius: "30px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)"
  },
  imageSide: {
    flex: 1,
    backgroundImage: "url('https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?auto=format&fit=crop&w=800&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative"
  },
  imageOverlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    padding: "40px",
    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
    color: "white"
  },
  logoText: { fontSize: "32px", margin: "0", fontWeight: "bold" },
  imageTagline: { fontSize: "16px", opacity: "0.9", marginTop: "10px" },
  formSide: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px"
  },
  formContent: { width: "100%", maxWidth: "350px" },
  formHeader: { fontSize: "28px", color: "#2c3e50", margin: "0 0 10px 0" },
  formSubtext: { fontSize: "14px", color: "#7f8c8d", marginBottom: "30px" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { fontSize: "12px", fontWeight: "bold", color: "#2c3e50", textTransform: "uppercase" },
  input: {
    padding: "12px 15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s"
  },
  submitBtn: {
    backgroundColor: "#ff6b6b",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)"
  },
  toggleText: { textAlign: "center", marginTop: "25px", fontSize: "14px", color: "#7f8c8d" },
  toggleLink: { color: "#ff6b6b", fontWeight: "bold", cursor: "pointer" },
  errorText: { color: "#e74c3c", fontSize: "14px", marginBottom: "15px", textAlign: "center" }
};

export default Login;