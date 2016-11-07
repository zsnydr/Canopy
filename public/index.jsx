import React from 'react';
import ReactDOM from 'react-dom';
import styles from './stylesheets/main/splash.scss';


const App = require('./components/app').default;
import reducers from './reducers';


ReactDOM.render(
 <App />
 , document.querySelector('.container')
 );


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

