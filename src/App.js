import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import UserContext from "./auth/UserContext";
import Navbar from "./partials/Navbar";
import Auth from "./auth/Auth";
import AuthRoute from "./auth/AuthRoute";
import ProtectedRoute from "./auth/ProtectedRoute";
import ResetPassword from "./auth/ResetPassword";
import axios from "axios";
import Todos from "./todos/Todos";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    if (userData) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + userData.access_token;
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="bg-dark h-100 overflow-auto">
        <Router>
          <Navbar />
          <div style={{ height: "3rem" }}></div>
          <Switch>
            <Route exact path="/">
              {user ? (
                <Todos />
              ) : (
                <h3 className="text-center text-light">
                  Log in or create account.
                </h3>
              )}
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
            <AuthRoute path="/password/reset/:token">
              <ResetPassword />
            </AuthRoute>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
