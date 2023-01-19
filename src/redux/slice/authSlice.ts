import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { login, LoginRequest } from 'util/apiUtils';
import { fetchUserByIdBase, UserResponse } from 'util/userApiUtils';
import { updateAuthUserBase, updateAuthUserPasswordBase, updateAuthUserPasswordRequest } from 'util/authApiUtils';
import { User } from 'model/user';

export type AuthData = {
  isLogin: boolean,
  data: User | null
  status: "idle" | "pending" | "succeeded" | "failed",
  error: undefined | string
};

const initialState: AuthData = {
  isLogin: false,
  data: null,
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

export const updateAuthUser = createAsyncThunk(
  'auth/updateUserStatus',
  async (data: FormData) => {
    const response = await updateAuthUserBase(data);
    return response
  }
)

export const updateAuthUserPassword = createAsyncThunk(
  'auth/updateUserPasswordStatus',
  async (data: updateAuthUserPasswordRequest) => {
    const response = await updateAuthUserPasswordBase(data);
    return response;
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
      state.data = action.payload;
    });
    builder.addCase(fetchAuthUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(updateAuthUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateAuthUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(updateAuthUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(updateAuthUserPassword.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateAuthUserPassword.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(updateAuthUserPassword.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  }
})

export const { logout } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer