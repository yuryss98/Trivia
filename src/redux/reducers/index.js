import { combineReducers } from 'redux';
import getPlayer from './player';

const rootReducer = combineReducers({
  getPlayer,
});

export default rootReducer;
