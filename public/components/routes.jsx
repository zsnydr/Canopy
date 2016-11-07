import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import { synchHistoryWithStore, routerReducer } from 'react-router-redux';

import Home from './app';
import RentList from '../containers/rent-list';

export default (
        <Router history={browserHistory}>
          <Route path="/" component={Home} />
          <Route path="/listing" component={RentList} />
          <Route path="*" component={RentList} />
        </Router>
  );
