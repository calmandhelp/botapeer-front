import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/userSlice'
import authReducer from '../slice/authSlice'
import logger from 'redux-logger'
import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // devTools: process.env.NODE_ENV !== 'production',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
