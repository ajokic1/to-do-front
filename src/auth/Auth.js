import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./Register";
import AuthRoute from "./AuthRoute";
import Login from "./Login";
import Logout from "./Logout";
import ForgotPassword from "./ForgotPassword";
import { ROUTES } from "../constants";

export default function Auth() {
  return (
    <Switch>
      <AuthRoute path={ROUTES.AUTH.REGISTER}>
        <Register />
      </AuthRoute>
      <AuthRoute path={ROUTES.AUTH.LOGIN}>
        <Login />
      </AuthRoute>
      <AuthRoute path={ROUTES.AUTH.FORGOT}>
        <ForgotPassword />
      </AuthRoute>
      <Route path={ROUTES.AUTH.LOGOUT}>
        <Logout />
      </Route>
    </Switch>
  );
}
