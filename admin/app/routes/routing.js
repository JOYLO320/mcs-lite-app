import React from 'react';
import { Route } from 'react-router';
import App from '../containers/app';
import Login from '../containers/login';
import Dashboard from '../components/dashboard';

export default (
  <Route component={App}>
    <Route
      path="/"
      components={App}
    />
    <Route
      path="/login"
      components={Login}
    />
    <Route
      path="/dashboard"
      components={Dashboard}
    />
  </Route>
);
