import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PlantRecordResponse, PostApi, ErrorResponse, PostResponse } from 'botapeer-openapi/typescript-axios';
import { RootState } from 'redux/store/store'
import { setupAuthConfig } from 'util/redux/apiBaseUtils';
import axios from 'axios'

const postApi = new PostApi();

export type PlantRecordData = {
  data: PostResponse | PlantRecordResponse[] | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: ErrorResponse | undefined;
};

const initialState: PlantRecordData = {
  data: null,
  status: "idle",
  error: undefined,
};

export const createPost = createAsyncThunk(
  'plantRecord/createPost',
  async (data: Parameters<typeof postApi.createPost>, thunkAPI) => {
  try {
    const response = await postApi.createPost(...data);
    return response
  } catch(error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const deletePost = createAsyncThunk(
  'plantRecord/deletePost',
  async (data: Parameters<typeof postApi.deletePost>, thunkAPI) => {
  try {    
    const response = await postApi.deletePost(...data);
    return response
  } catch(error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const postSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.data;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.status = "failed";
      const errors = action.payload as ErrorResponse;
      state.error = errors;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.status = "failed";
      const errors = action.payload as ErrorResponse;
      state.error = errors;
    });
  }
})

export const selectPlantRecord = (state: RootState) => state.posts

export default postSlice.reducer