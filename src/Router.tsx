import React, { FunctionComponent } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard';

interface RouterProps { }


const Router: FunctionComponent<RouterProps> = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route
        path="/ordenes"
        component={Orders}
      />
      <Route
        path="/tablero"
        component={Dashboard}
      />
      <Redirect
        from="/"
        to="/ordenes"
      />
    </Switch>
  </BrowserRouter>
);
export default Router;
