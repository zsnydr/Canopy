import { combineReducers } from 'redux';

import rents from './reducer_rents';

const rootReducer = combineReducers({
  rents
});

export default rootReducer;
