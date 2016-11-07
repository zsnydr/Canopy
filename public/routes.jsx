import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { synchHistoryWithStore, routerReducer } from 'react-router-redux';

import App from './components/app';
import RentList from './containers/rent-list';
import SplashPage from './components/splashpage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={SplashPage} />
    <Route path="listing" component={RentList} />
  </Route>

  );
