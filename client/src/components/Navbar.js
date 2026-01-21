import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('jwt'); // Clear JWT
        setUser(null);
        navigate('/login');
    }

    return (
        <nav style={{ padding: '10px', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-around' }}>
            <NavLink to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>PawsStay 🐾</NavLink>
            
            {user ? (
                <>
                    <NavLink to="/pets" style={{ color: 'white' }}>My Pets</NavLink>
                    <NavLink to="/book" style={{ color: 'white' }}>Book a Stay</NavLink>
                    <button onClick={handleLogout} style={{ background: 'orange', border: 'none', cursor: 'pointer' }}>Logout</button>
                    <span>Logged in as: {user.username}</span>
                </>
            ) : (
                <>
                    <NavLink to="/login" style={{ color: 'white' }}>Login</NavLink>
                    <NavLink to="/signup" style={{ color: 'white' }}>Sign Up</NavLink>
                </>
            )}
        </nav>
    );
}

export default Navbar;