import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/app';
import RentList from './containers/rent-list';
import Splash from './components/splashpage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Splash} />
    <Route path="listing" component={RentList} />
  </Route>
);
