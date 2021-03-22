import {
  combineReducers,
  configureStore,
  // getDefaultMiddleware,
  Reducer
} from '@reduxjs/toolkit';
// import logger from 'redux-logger';

const rootReducer: Reducer = combineReducers({});

export default configureStore({ reducer: rootReducer });
