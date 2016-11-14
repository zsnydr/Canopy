import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import listings from './reducer_listings';
import activeCity from './reducer_active_city';
import activeListing from './reducer_active_listing';

const rootReducer = combineReducers({
  routing: routerReducer,
  activeListing,
  activeCity,
  listings
});

export default rootReducer;
