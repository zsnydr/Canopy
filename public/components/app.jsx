import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { synchHistoryWithStore, routerReducer } from 'react-router-redux';


import RentList from '../containers/rent-list';
import reducers from '../reducers/index';

const SplashPage = require('./splash_page').default;


const store = createStore(
          combineReducers({
            reducers,
            routing: routerReducer
          })
        );


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={SplashPage} />
          <Route path="/listing" component={RentList} />
        </Router>
      </Provider>     
    );
  }
}
