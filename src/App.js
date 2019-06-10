import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import logo from './logo.svg';
import './App.css';
import OrdersList from './orders-list';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <OrdersList />
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
