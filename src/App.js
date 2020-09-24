import React, { useState, useEffect } from "react";
import "./App.css";
import UserContext from "./auth/UserContext";
import Router from "./Router";
import AuthService from "./services/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      if (!AuthService.isAuthenticated()) {
        return;
      }
      const user = await AuthService.getUser();
      setUser(user);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="bg-dark h-100 overflow-auto">
        <Router/>
      </div>
    </UserContext.Provider>
  );
}

export default App;
