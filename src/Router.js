import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from "./partials/Navbar";
import Auth from "./auth/Auth";
import AuthRoute from "./auth/AuthRoute";
import ProtectedRoute from "./auth/ProtectedRoute";
import ResetPassword from "./auth/ResetPassword";
import AuthService from "./services/auth";
import { ROUTES } from "./constants";
import Todos from "./todos/Todos";
import TodoForm from './todos/TodoForm';

function Router() {
  return (
    <div>
      <BrowserRouter>
          <Navbar />
          <div style={{ height: "3rem" }}></div>
          <Switch>
            <Route exact path={ROUTES.HOME}>
              {AuthService.isAuthenticated() ? (
                <Todos />
              ) : (
                <h3 className="text-center text-light">
                  Log in or create account.
                </h3>
              )}
            </Route>
            <Route path={ROUTES.AUTH.BASE}>
              <Auth />
            </Route>
            <AuthRoute path={ROUTES.AUTH.RESET}>
              <ResetPassword />
            </AuthRoute>
            <ProtectedRoute path={`${ROUTES.TODOS.EDIT}/:id`}>
              <TodoForm />
            </ProtectedRoute>
            <ProtectedRoute path={`${ROUTES.TODOS.CREATE}`}>
              <TodoForm />
            </ProtectedRoute>
          </Switch>
        </BrowserRouter>
    </div>
  )
}

export default Router;
