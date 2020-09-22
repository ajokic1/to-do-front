import React from 'react'
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ children, ...props }) {
  const isAuthenticated = localStorage.getItem('token');
  console.log(isAuthenticated);
  if(!isAuthenticated)
    return <Redirect to='/login'/>

  return (
    <Route { ...props }>
      { children }
    </Route>
  )
}

export default ProtectedRoute;
