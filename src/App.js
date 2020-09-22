import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import UserContext from "./auth/UserContext";
import Navbar from "./partials/Navbar";
import Auth from "./auth/Auth";
import AuthRoute from "./auth/AuthRoute";
import ResetPassword from "./auth/ResetPassword";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <AuthRoute path="/password/reset/:token">
            <ResetPassword />
          </AuthRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
