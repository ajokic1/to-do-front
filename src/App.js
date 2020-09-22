import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './auth/Register';
import AuthRoute from './auth/AuthRoute';
import Login from './auth/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          Home
        </Route>
        <AuthRoute path='/register'>
          <Register/>
        </AuthRoute>
        <AuthRoute path='/login'>
          <Login/>
        </AuthRoute>
      </Switch>
    </Router>
  );
}

export default App;
