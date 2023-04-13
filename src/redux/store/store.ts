import { configureStore, Middleware } from '@reduxjs/toolkit'
import userReducer from 'redux/slice/userSlice'
import authReducer from 'redux/slice/authSlice'
import postReducer from 'redux/slice/postSlice'
import authUserReducer from 'redux/slice/authUserSlice'
import plantRecordReducer from 'redux/slice/plantRecordSlice'
import placeReducer from 'redux/slice/placeSlice'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({ 
  auth: authReducer,
  authUser: authUserReducer,
  users: userReducer, 
  plantRecords: plantRecordReducer,
  posts: postReducer,
  places: placeReducer
});

const middlewares: Middleware[] = [];
if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(middlewares),
  devTools: process.env.NODE_ENV === 'development',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
