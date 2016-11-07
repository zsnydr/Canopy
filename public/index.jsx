import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';


import styles from './stylesheets/main/splash.scss';
import routes from './routes';
import reducers from './reducers';


ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.querySelector('.container')
);


if (module.hot) {
  // Whenever a new version of App.js is available
  module.hot.accept('./routes', () => {
    // Require the new version and render it instead
    const NextApp = require('./routes').default;

    ReactDOM.render(
      <NextApp />
    , document.querySelector('.container'));
  });
}

