import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PostApi, ErrorResponse, PostResponse } from 'botapeer-openapi/typescript-axios';
import { RootState } from 'redux/store/store'

const postApi = new PostApi();

export type PostData = {
  data: PostResponse | PostResponse[] | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: ErrorResponse | undefined;
};

const initialState: PostData = {
  data: null,
  status: "idle",
  error: undefined,
};

export const fetchPost = createAsyncThunk(
  'plantRecord/fetchPost',
  async (data: Parameters<typeof postApi.getPostById>, thunkAPI) => {
  try {
    const response = await postApi.getPostById(...data);
    return response
  } catch(error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

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

export const createLikeToPost = createAsyncThunk(
  'plantRecord/createLikeToPost',
  async (data: Parameters<typeof postApi.createLikeToPost>, thunkAPI) => {
  try {    
    const response = await postApi.createLikeToPost(...data);
    return response
  } catch(error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const deleteLikeToPost = createAsyncThunk(
  'plantRecord/deleteLikeToPost',
  async (data: Parameters<typeof postApi.deleteLikeToPost>, thunkAPI) => {
  try {
    const response = await postApi.deleteLikeToPost(...data);
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
    builder.addCase(fetchPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.data;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.status = "failed";
      const errors = action.payload as ErrorResponse;
      state.error = errors;
    });
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
    builder.addCase(createLikeToPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createLikeToPost.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(createLikeToPost.rejected, (state, action) => {
      state.status = "failed";
      const errors = action.payload as ErrorResponse;
      state.error = errors;
    });
    builder.addCase(deleteLikeToPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteLikeToPost.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(deleteLikeToPost.rejected, (state, action) => {
      state.status = "failed";
      const errors = action.payload as ErrorResponse;
      state.error = errors;
    });
  }
})

export const selectPost = (state: RootState) => state.posts

export default postSlice.reducer