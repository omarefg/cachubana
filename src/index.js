import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Router from './Router';
import { MuiThemeProvider } from '@material-ui/core/styles'
import store from './store';
import theme from './theme';
import * as serviceWorker from './serviceWorker';

import './index.css';

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
