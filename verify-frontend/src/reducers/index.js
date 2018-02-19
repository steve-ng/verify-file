import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import uploadState from 'reducers/uploadState';
import ethState from 'reducers/ethState';

const rootReducer = combineReducers({
  uploadState,
  ethState,
  routing: routerReducer,
});

export default rootReducer;
