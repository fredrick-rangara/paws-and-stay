import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ user, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    fetch("http://localhost:5555/logout", {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        onLogout(); // Clears user state in App.js
        navigate("/"); // Redirects to home/login
      }
    });
  }

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.logo}>
        <Link to="/" style={navStyles.logoLink}>
          PawsStay 🐾
        </Link>
      </div>
      <div style={navStyles.links}>
        <Link to="/dashboard" style={navStyles.link}>
          Find Work
        </Link>
        <Link to="/pets" style={navStyles.link}>
          My Pets
        </Link>
        <span style={navStyles.userGreet}>
          Hi, {user ? user.username : "Guest"}!
        </span>
        <button onClick={handleLogout} style={navStyles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const navStyles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  logo: { fontSize: "24px", fontWeight: "bold" },
  logoLink: { textDecoration: "none", color: "#ff6b6b" },
  links: { display: "flex", alignItems: "center", gap: "25px" },
  link: { textDecoration: "none", color: "#555", fontWeight: "500" },
  userGreet: { color: "#999", fontStyle: "italic" },
  logoutBtn: {
    backgroundColor: "#eee",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    color: "#333",
    cursor: "pointer",
  },
};

export default NavBar;