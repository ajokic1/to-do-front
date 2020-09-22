import React from 'react'
import { Redirect, Route } from 'react-router-dom';

function AuthRoute({ children, ...props }) {
  const isAuthenticated = localStorage.getItem('token');
  
  if(isAuthenticated)
    return <Redirect to='/authenticated'/>

  return (
    <Route { ...props }>
      { children }
    </Route>
  )
}

export default AuthRoute;