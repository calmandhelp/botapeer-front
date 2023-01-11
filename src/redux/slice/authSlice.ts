import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { login, LoginRequest } from 'util/apiUtils';
import jwtDecode from 'jwt-decode';

export type AuthData = {
  isLogin: boolean,
  accessToken: string,
  userId?: number,
  status: "idle" | "pending" | "succeeded" | "failed",
  error: undefined | string
};

const initialState: AuthData = {
  isLogin: false,
  accessToken: "",
  userId: undefined,
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
      state.isLogin = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      localStorage.setItem("ACCESS_TOKEN",action.payload.accessToken)
      state.accessToken = action.payload.accessToken;
      state.status = "succeeded";
      state.isLogin = true;
      const token: Token = jwtDecode(action.payload.accessToken)
      state.userId = token.sub;
      // state.isRedirect = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.isLogin = false;
    });
  }
})

export const { logout } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer