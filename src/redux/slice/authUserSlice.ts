import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { fetchAuthUserByIdBase, updateAuthUserBase, updateAuthUserPasswordBase, updateAuthUserPasswordRequest } from 'util/redux/authUserUtils';
import { User } from 'model/user';

export type AuthData = {
  data: User | null
  status: "idle" | "pending" | "succeeded" | "failed",
  error: undefined | string
};

const initialState: AuthData = {
  data: null,
  status: "idle",
  error: undefined,
};

export const fetchAuthUserById = createAsyncThunk(
  'authUser/fetchAuthUserStatus',
  async (userId: number) => {
    const response = await fetchAuthUserByIdBase(userId);
    return response
  }
)

export const updateAuthUser = createAsyncThunk(
  'authUser/updateAuthUserStatus',
  async (data: FormData) => {
    const response = await updateAuthUserBase(data);
    return response
  }
)

export const updateAuthUserPassword = createAsyncThunk(
  'authUser/updateUserPasswordStatus',
  async (data: updateAuthUserPasswordRequest) => {
    const response = await updateAuthUserPasswordBase(data);
    return response;
  }
)

export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchAuthUserById.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchAuthUserById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(fetchAuthUserById.rejected, (state, action) => {
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

export const selectAuthUser = (state: RootState) => state.authUser

export default authUserSlice.reducer