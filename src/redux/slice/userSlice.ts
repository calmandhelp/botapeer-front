import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { fetchUserByIdBase, fetchUserByNameBase, fetchUserByPlantRecordIdBase, UserResponse } from 'util/redux/userUtils';

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
  'user/fetchUserByIdStatus',
  async (userId: number) => {
    const response = await fetchUserByIdBase(userId);
    return response
  }
)

export const fetchUsersByName = createAsyncThunk(
  'user/fetchUserByNameStatus',
  async (name: string) => {
    const response = await fetchUserByNameBase(name);
    return response
  }
)

export const fetchUserByPlantRecordId = createAsyncThunk(
  'user/fetchUserByPlantRecordId',
  async (plantRecordId: number) => {
    const response = await fetchUserByPlantRecordIdBase(plantRecordId);
    return response
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
    builder.addCase(fetchUserByPlantRecordId.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchUserByPlantRecordId.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchUserByPlantRecordId.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  }
})

export const selectUser = (state: RootState) => state.users

export default userSlice.reducer