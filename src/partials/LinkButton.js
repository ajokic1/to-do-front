import React from "react";
import { Link } from "react-router-dom";

function LinkButton({ className, style = "primary", to, children, ...props }) {
  const classNames = `btn btn-${style}` + (className && " " + className);

  return (
    <Link className={classNames} role="button" to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
