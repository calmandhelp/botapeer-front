import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import axios from 'axios'
 
// Define a type for the slice state
const userDataExample = {
  id: 0,
  name: "",
  email: "",
  status: false,
  present: false,
  password: "",
  coverImage: "",
  profileImage: "",
  description: "",
}

export type UserData = {
  data: typeof userDataExample | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: undefined | string;
};

const initialState: UserData = {
  data: null,
  status: "idle",
  error: undefined,
};

export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId: number) => {
    const response = await axios.get('http://localhost:8081/api/users/' + userId)
    return response.data
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
  }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.users

export default userSlice.reducer