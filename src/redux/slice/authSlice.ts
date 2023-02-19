import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { AuthInfo, SignUpRequest, signUpBase } from 'util/redux/authUtils';
import { getIdByAccessToken } from 'util/redux/apiBaseUtils';
import { ACCESS_TOKEN } from 'constants/apiConstants';
import { SignInRequest } from 'botapeer-openapi/typescript-axios';
import { AuthApi } from 'botapeer-openapi/typescript-axios/api/auth-api';

const authApi = new AuthApi();

export type AuthData = {
  status: "idle" | "pending" | "succeeded" | "failed",
  error: undefined | string
} & AuthInfo

const initialState: AuthData = {
  isLogin: false,
  userId: 0,
  accessToken: "",
  status: "idle",
  error: undefined,
};

export const signIn = createAsyncThunk(
  'auth/signInStatus',
  async (data: SignInRequest) => {
    const response = await authApi.signin(data);
    return response
  }
)

export const signUp = createAsyncThunk(
  'auth/signUpStatus',
  async (data: SignUpRequest) => {
    const response = await signUpBase(data);
    return response
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    persitLogin: (state, action: PayloadAction<AuthInfo>) => {
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.isLogin = action.payload.isLogin;
    },
    logout: (state) =>{
      localStorage.removeItem(ACCESS_TOKEN)
      state.accessToken = ""
      state.userId = 0
      state.isLogin = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      localStorage.setItem(ACCESS_TOKEN, action.payload.data.accessToken);
      state.accessToken = action.payload.data.accessToken
      state.userId = getIdByAccessToken(action.payload.data.accessToken)
      state.status = "succeeded";
      state.isLogin = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  }
})

export const { persitLogin, logout } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer