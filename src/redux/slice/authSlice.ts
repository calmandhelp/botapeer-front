import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { login, LoginRequest, AuthInfo } from 'util/redux/authUtils';
import { getIdByAccessToken } from 'util/redux/apiBaseUtils';
import { ACCESS_TOKEN } from 'constants/apiConstants';

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
      state.accessToken = ""
      state.isLogin = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
      state.userId = getIdByAccessToken(action.payload.accessToken)
      state.status = "succeeded";
      state.isLogin = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  }
})

export const { logout } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer