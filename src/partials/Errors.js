import React from "react";

function Errors({ errors }) {
  const errorMessages =
    errors && errors.map((error) => <div key={error} className="mb-1">{error}</div>);

  return <div className="text-danger mb-4">{errorMessages}</div>;
}

export default Errors;
