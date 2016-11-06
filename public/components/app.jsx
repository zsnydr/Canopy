import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import RentList from '../containers/rent-list';
import reducers from '../reducers/index';

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <RentList />
      </Provider>
    );
  }
}
