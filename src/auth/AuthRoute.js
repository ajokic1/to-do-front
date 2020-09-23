import React from "react";
import { Redirect, Route } from "react-router-dom";
import { ROUTES } from "../constants";
import AuthService from "../services/auth";

function AuthRoute({ children, ...props }) {
  if (AuthService.isAuthenticated()) return <Redirect to={ROUTES.HOME} />;

  return <Route {...props}>{children}</Route>;
}

export default AuthRoute;
