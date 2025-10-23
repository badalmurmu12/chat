import { combineReducers } from 'redux';
import { authreducer as auth } from './auth';
import { projectreducer as project } from './project';
 

const reducers = {
  auth,
  project,
};
const appReducer = combineReducers(reducers);
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_FULFILLED') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
