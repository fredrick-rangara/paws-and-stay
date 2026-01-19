import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const API_BASE = "https://paws-and-stay.onrender.com";

  useEffect(() => {
    fetch(`${API_BASE}/check_session`, { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          res.json().then((user) => setUser(user));
        }
      });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <Switch>
      <Route path="/">
        <Dashboard user={user} />
      </Route>
    </Switch>
  );
}

export default App;