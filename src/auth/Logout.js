import React from "react";
import useAuth from "./AuthHook";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants";

function Logout() {
  const { logout } = useAuth();
  logout();
  return (
    <div className="text-center my-5">
      <h3>Successfully signed out.</h3>
      <Link to={ROUTES.HOME}>Return to homepage</Link>
    </div>
  );
}

export default Logout;
