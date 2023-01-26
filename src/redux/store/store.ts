import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'redux/slice/userSlice'
import authReducer from 'redux/slice/authSlice'
import authUserReducer from 'redux/slice/authUserSlice'
import plantRecordReducer from 'redux/slice/plantRecordSlice'
import placeReducer from 'redux/slice/placeSlice'
import logger from 'redux-logger'
import {combineReducers} from 'redux';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth'],
// };

const rootReducer = combineReducers({ 
  auth: authReducer,
  authUser: authUserReducer,
  users: userReducer, 
  plantRecords: plantRecordReducer,
  places: placeReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),
  // devTools: process.env.NODE_ENV !== 'production',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
