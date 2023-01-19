import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { login, LoginRequest } from 'util/apiUtils';
import { fetchUserByIdBase, UserResponse } from 'util/userApiUtils';

export type AuthData = {
  isLogin: boolean,
  userName: string | undefined,
  userId: number | undefined,
  status: "idle" | "pending" | "succeeded" | "failed",
  error: undefined | string
};

const initialState: AuthData = {
  isLogin: false,
  userName: '',
  userId: 0,
  status: "idle",
  error: undefined,
};

export interface Token {
  iat: number,
  exp: number,
  sub: number
}

export const signIn = createAsyncThunk(
  'auth/signInStatus',
  async (data: LoginRequest) => {
    const response = await login(data);
    return response
  }
)

export const fetchAuthUser = createAsyncThunk(
  'auth/fetchAuthUserStatus',
  async (userId: number) => {
    const response = await fetchUserByIdBase(userId);
    return response
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) =>{
      localStorage.removeItem("ACCESS_TOKEN");
      state.isLogin = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      localStorage.setItem("ACCESS_TOKEN", action.payload.accessToken)
      state.status = "succeeded";
      state.isLogin = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchAuthUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.userName = action.payload.name;
      state.userId = action.payload.id;
    });
    builder.addCase(fetchAuthUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  }
})

export const { logout } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer