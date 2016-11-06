import React from 'react';
import ReactDOM from 'react-dom';
import styles from './stylesheets/main/splash.scss';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';


const createStoreWithMiddleware = applyMiddleware()(createStore);
const App = require('./components/app').default;
import reducers from './reducers';


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router histor={histor}>
      <Route path='/' component={App}>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));



if (module.hot) {
  // Whenever a new version of App.js is available
  module.hot.accept('./components/app', () => {
    // Require the new version and render it instead
    const NextApp = require('./components/app').default;

    ReactDOM.render(
      <NextApp />
    , document.querySelector('.container'));
  });
}

