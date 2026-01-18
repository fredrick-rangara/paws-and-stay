import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyPets from "./pages/MyPets";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login: Check if a session already exists
  useEffect(() => {
    fetch("/check_session").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  // Show a simple loading screen while checking session
  if (loading) return <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading PawsStay...</h1>;

  // If no user is logged in, show the Login page
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  // If user is logged in, show the full app
  return (
    <div className="App">
      <NavBar user={user} onLogout={() => setUser(null)} />
      <Switch>
        <Route exact path="/dashboard">
          <Dashboard user={user} />
        </Route>
        
        <Route exact path="/pets">
          <MyPets />
        </Route>

        {/* Redirect home to dashboard if logged in */}
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;