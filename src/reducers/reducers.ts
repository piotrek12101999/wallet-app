import { combineReducers } from 'redux';

import authReducer from './authReducer';
import uiReducer from './uiReducer';
import fetchReducer from './fetchReducer';

export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  fetch: fetchReducer
});
