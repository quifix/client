import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import store from '.';
import logger from 'redux-logger';
import { projectReducer } from './features';

const { reducer: project } = projectReducer;

const middleware =
  process.env.NODE_ENV === 'development'
    ? [...getDefaultMiddleware(), logger]
    : [...getDefaultMiddleware()];

export default configureStore({
  reducer: {
    project
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development' ? true : false
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
