import React from 'react';
import ReactDOM from 'react-dom';
import styles from './stylesheets/main/splash.scss';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';


import routes from './components/routes';
import reducers from './reducers';


ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('.container')
);


if (module.hot) {
  // Whenever a new version of App.js is available
  module.hot.accept('./components/routes', () => {
    // Require the new version and render it instead
    const NextApp = require('./components/routes').default;

    ReactDOM.render(
      <NextApp />
    , document.querySelector('.container'));
  });
}

