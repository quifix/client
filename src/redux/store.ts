import {
  combineReducers,
  configureStore,
  // getDefaultMiddleware,
  Reducer
} from '@reduxjs/toolkit';
import store from '.';
// import logger from 'redux-logger';

const rootReducer: Reducer = combineReducers({});

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development' ? true : false
});

export type RootState = ReturnType<typeof store.getState>;
