import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'redux/store/store'
import { UserResponse, UserApi, ErrorResponse } from 'botapeer-openapi/typescript-axios';

export type AuthData = {
  data: UserResponse | null
  status: "idle" | "pending" | "succeeded" | "failed",
  error: ErrorResponse | undefined
};

const initialState: AuthData = {
  data: null,
  status: "idle",
  error: undefined,
};

const userApi = new UserApi();

export const fetchAuthUserById = createAsyncThunk(
  'authUser/fetchAuthUserStatus',
  async (userId: number, thunkAPI) => {
    try {
      const response = await userApi.findUserById(userId.toString());
      return response
    } catch(error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const updateAuthUser = createAsyncThunk(
  'authUser/updateAuthUserStatus',
  async (data: Parameters<typeof userApi.updateUser>, thunkAPI) => {
    try {
      const response = await userApi.updateUser(...data);
      return response
    } catch(error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

// export const updateAuthUserPassword = createAsyncThunk(
//   'authUser/updateUserPasswordStatus',
//   async (data: updateAuthUserPasswordRequest) => {
//     const response = await updateAuthUserPasswordBase(data);
//     return response;
//   }
// )

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
      state.data = action.payload.data;
    });
    builder.addCase(fetchAuthUserById.rejected, (state, action) => {
      state.status = "failed";
      const errors = action.payload as ErrorResponse;
      state.error = errors
    });
    builder.addCase(updateAuthUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateAuthUser.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.status = "succeeded";
    });
    builder.addCase(updateAuthUser.rejected, (state, action) => {
      state.status = "failed";
      const errors = action.payload as ErrorResponse;
      state.error = errors
    });
    // builder.addCase(updateAuthUserPassword.pending, (state) => {
    //   state.status = "pending";
    // });
    // builder.addCase(updateAuthUserPassword.fulfilled, (state, action) => {
    //   state.data = action.payload;
    //   state.status = "succeeded";
    // });
    // builder.addCase(updateAuthUserPassword.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // });
  }
})

export const selectAuthUser = (state: RootState) => state.authUser

export default authUserSlice.reducer