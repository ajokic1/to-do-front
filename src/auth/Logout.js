import React from "react";
import useAuth from "./AuthHook";
import { Link } from "react-router-dom";

function Logout() {
  const { logout } = useAuth();
  logout();
  return (
    <div className="text-center my-5 text-light">
      <h3>Successfully signed out.</h3>
      <Link to="/">Return to homepage</Link>
    </div>
  );
}

export default Logout;
