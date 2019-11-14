import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import App from './App';


const Router : React.FunctionComponent = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route
        path="/"
        component={App}
        exact
      />
    </Switch>
  </BrowserRouter>
);
export default Router;
