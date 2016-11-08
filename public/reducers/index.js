import { combineReducers } from 'redux';

import rents from './reducer_rents';
import activeCity from './reducer_active_city';
import activeListing from './reducer_active_listing';

const rootReducer = combineReducers({
  activeListing,
  activeCity,
  rents
});

export default rootReducer;
