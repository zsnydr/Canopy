import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import listingData from './reducer_listings';
import activeCity from './reducer_active_city';
import activeListing from './reducer_active_listing';

const rootReducer = combineReducers({
  activeListing,
  activeCity,
  listingData,
  routing: routerReducer
});

export default rootReducer;
