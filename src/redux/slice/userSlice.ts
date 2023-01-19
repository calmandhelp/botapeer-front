import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { fetchUserByIdBase, fetchUserByNameBase, updateUserBase, updateUserPasswordBase, updateUserPasswordRequest, UserRequest, UserResponse } from 'util/userApiUtils';

export type UserData = {
  data: UserResponse | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: undefined | string;
};

const initialState: UserData = {
  data: null,
  status: "idle",
  error: undefined,
};

export const fetchUserById = createAsyncThunk(
  'auth/fetchUserByIdStatus',
  async (userId: number) => {
    const response = await fetchUserByIdBase(userId);
    return response
  }
)

export const fetchUsersByName = createAsyncThunk(
  'auth/fetchUserByNameStatus',
  async (name: string) => {
    const response = await fetchUserByNameBase(name);
    return response
  }
)

export const updateUser = createAsyncThunk(
  'auth/updateUserStatus',
  async (data: FormData) => {
    const response = await updateUserBase(data);
    return response
  }
)

export const updateUserPassword = createAsyncThunk(
  'auth/updateUserPasswordStatus',
  async (data: updateUserPasswordRequest) => {
    const response = await updateUserPasswordBase(data);
    return response;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchUsersByName.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchUsersByName.fulfilled, (state, action) => {
      const users = action.payload;
      state.data = users[0];
      state.status = "succeeded";
    });
    builder.addCase(fetchUsersByName.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(updateUserPassword.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateUserPassword.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(updateUserPassword.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.users

export default userSlice.reducer