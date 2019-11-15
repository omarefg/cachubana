import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Orders from './pages/Orders';


const Router : React.FunctionComponent = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route
        path="/"
        component={Orders}
        exact
      />
    </Switch>
  </BrowserRouter>
);
export default Router;
