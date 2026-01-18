import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar({ user, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        onLogout(); // Clears user state in App.js
        navigate("/"); // Redirects to login page
      }
    });
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <NavLink to="/dashboard" style={styles.logoLink}>
          🐾 Paws & Stay
        </NavLink>
      </div>

      <div style={styles.links}>
        <NavLink to="/dashboard" style={styles.link} activeStyle={styles.active}>
          Dashboard
        </NavLink>
        <NavLink to="/pets" style={styles.link} activeStyle={styles.active}>
          My Pets
        </NavLink>
        
        {user && (
          <div style={styles.userSection}>
            <span style={styles.username}>Hello, {user.username}!</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#2d3436",
    color: "white",
    marginBottom: "20px",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  logoLink: {
    color: "#ff6b6b",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
  },
  active: {
    textDecoration: "underline",
    color: "#ff6b6b",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginLeft: "20px",
    borderLeft: "1px solid #636e72",
    paddingLeft: "20px",
  },
  username: {
    fontSize: "0.9rem",
    fontStyle: "italic",
    color: "#dfe6e9",
  },
  logoutBtn: {
    backgroundColor: "#ff6b6b",
    color: "white",
    border: "none",
    padding: "5px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default NavBar;