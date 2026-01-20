import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import the image

function NavBar() {
  return (
    <nav style={{ 
      display: "flex", 
      alignItems: "center", 
      padding: "10px 20px", 
      background: "#2c3e50",
      color: "white" 
    }}>
      {/* Logo Section */}
      <div style={{ display: "flex", alignItems: "center", marginRight: "auto" }}>
        <img 
          src={logo} 
          alt="PawsStay Logo" 
          style={{ height: "40px", marginRight: "10px" }} 
        />
        <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>PawsStay</span>
      </div>

      {/* Links Section */}
      <div style={{ display: "flex", gap: "20px" }}>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/my-pets" className={({ isActive }) => isActive ? "active" : ""}>My Pets</NavLink>
        <NavLink to="/book-sitter" className={({ isActive }) => isActive ? "active" : ""}>Book Sitter</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;