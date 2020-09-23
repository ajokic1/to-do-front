import React from 'react'

function Errors({ errors }) {
  const errorMessages = errors && errors.map(error => (
    <div className="mb-1">
        {error}
    </div>
  ));
  
  return (
    <div className="text-center text-danger mb-4">
      {errorMessages}
    </div>
  ); 
}

export default Errors
