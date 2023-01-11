import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { login, LoginRequest } from 'util/apiUtils';

export type AuthData = {
  isLogin: boolean,
  accessToken: string,
  status: "idle" | "pending" | "succeeded" | "failed";
  error: undefined | string;
};

const initialState: AuthData = {
  isLogin: false,
  accessToken: "",
  status: "idle",
  error: undefined,
};

export const signIn = createAsyncThunk(
  'auth/signInStatus',
  async (data: LoginRequest) => {
    const response = await login(data);
    return response
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.status = "pending";
      state.isLogin = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      localStorage.setItem("ACCESS_TOKEN",action.payload.accessToken)
      state.accessToken = action.payload.accessToken;
      state.status = "succeeded";
      state.isLogin = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.isLogin = false;
    });
  }
})

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer


