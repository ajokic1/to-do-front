import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import UserContext from "./auth/UserContext";
import Navbar from "./partials/Navbar";
import Auth from "./auth/Auth";
import AuthRoute from "./auth/AuthRoute";
import ResetPassword from "./auth/ResetPassword";
import AuthService from "./services/auth";
import { ROUTES } from "./constants";
import Todos from "./todos/Todos";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await AuthService.getUser();
      setUser(user);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="bg-dark h-100 overflow-auto">
        <Router>
          <Navbar />
          <div style={{ height: "3rem" }}></div>
          <Switch>
            <Route exact path={ROUTES.HOME}>
              {user ? (
                <Todos />
              ) : (
                <h3 className="text-center text-light">
                  Log in or create account.
                </h3>
              )}
            </Route>
            <Route path={ROUTES.AUTH.BASE}>
              <Auth />
            </Route>
            <AuthRoute path={ROUTES.AUTH.RESET}>
              <ResetPassword />
            </AuthRoute>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
