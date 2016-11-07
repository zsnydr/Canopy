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
  </Provider>
  ,
  document.querySelector('.container')
);


// Hot Reloading.  Not working
// if (module.hot) {
//   module.hot.accept('./hotMiddleWare', () => {
//     const newHot = require('./hotMiddleWare').default;

//     ReactDOM.render(
//       <newHot />,
//      document.querySelector('.container')
//     );
//   });
// }
