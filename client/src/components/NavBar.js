import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/my-pets">My Pets</NavLink>
      <NavLink to="/book">Book Stay</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </nav>
  );
}
