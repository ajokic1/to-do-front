import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./Register";
import AuthRoute from "./AuthRoute";
import Login from "./Login";
import Logout from "./Logout";
import ForgotPassword from "./ForgotPassword";

export default function Auth() {
  return (
    <Switch>
      <AuthRoute path="/auth/register">
        <Register />
      </AuthRoute>
      <AuthRoute path="/auth/login">
        <Login />
      </AuthRoute>
      <AuthRoute path="/auth/password/forgot">
        <ForgotPassword />
      </AuthRoute>
      <Route path="/auth/logout">
        <Logout />
      </Route>
    </Switch>
  );
}
