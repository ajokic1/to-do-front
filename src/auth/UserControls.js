import React from "react";
import useAuth from "../auth/AuthHook";
import LinkButton from "../partials/LinkButton";

function UserControls() {
  const auth = useAuth();

  const loggedIn = (
    <span>
      {auth.user && `${auth.user.first_name} ${auth.user.last_name}`}
      <LinkButton className="ml-3" to="/auth/logout">
        Sign out
      </LinkButton>
    </span>
  );

  const notLoggedIn = (
    <span>
      <LinkButton className="ml-3" to="/auth/login">
        Sign in
      </LinkButton>
      <LinkButton className="ml-3" to="/auth/register">
        Register
      </LinkButton>
    </span>
  );

  return <div>{auth.user ? loggedIn : notLoggedIn}</div>;
}

export default UserControls;
