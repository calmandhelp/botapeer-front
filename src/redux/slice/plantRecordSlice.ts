import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreatePlantRecordRequest, PlantRecordResponse, PlantRecordApi, CreatePostRequest, ErrorResponse } from 'botapeer-openapi/typescript-axios';
import { RootState } from 'redux/store/store'
import { setupAuthConfig } from 'util/redux/apiBaseUtils';
import axios from 'axios'

const plantRecordApi = new PlantRecordApi();

export type PlantRecordData = {
  data: PlantRecordResponse | PlantRecordResponse[] | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: ErrorResponse | undefined;
};

const initialState: PlantRecordData = {
  data: null,
  status: "idle",
  error: undefined,
};

export const fetchPlantRecordById = createAsyncThunk(
  'plantRecord/fetchPlantRecordByIdStatus',
  async (plantRecordId: string, thunkAPI) => {
    try {
    const response = await plantRecordApi.getPlantRecordById(plantRecordId);
    return response
    } catch(error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const createPlantRecord = createAsyncThunk(
  'plantRecord/createPlantRecordStatus',
  async (data: CreatePlantRecordRequest, thunkAPI) => {
    try {
    const response = await plantRecordApi.createPlantRecord(data, setupAuthConfig());
    return response
  } catch(error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const fetchPlantRecordByUserId = createAsyncThunk(
  'plantRecord/fetchPlantRecordByUserIdStatus',
  async (userId: number, thunkAPI) => {
    try {
    const response = await plantRecordApi.getPlantRecordByUserId(userId.toString())
    return response
  } catch(error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const createPost = createAsyncThunk(
  'plantRecord/createPost',
  async (data: Parameters<typeof plantRecordApi.createPost>, thunkAPI) => {
  try {
    const response = await plantRecordApi.createPost(...data);
    return response
  } catch(error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const deletePost = createAsyncThunk(
  'plantRecord/deletePost',
  async (data: Parameters<typeof plantRecordApi.deletePost>, thunkAPI) => {
  try {    
    const response = await plantRecordApi.deletePost(...data);
    return response
  } catch(error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const plantRecordSlice = createSlice({
  name: 'plantRecord',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlantRecordById.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchPlantRecordById.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.status = "succeeded";
    });
    builder.addCase(fetchPlantRecordById.rejected, (state, action) => {
      state.status = "failed";
      const errors = action.payload as ErrorResponse;
      state.error = errors;
    });
    builder.addCase(fetchPlantRecordByUserId.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchPlantRecordByUserId.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.status = "succeeded";
    });
    builder.addCase(fetchPlantRecordByUserId.rejected, (state, action) => {
      state.status = "failed";
      const errors = action.payload as ErrorResponse;
      state.error = errors;
    });
    builder.addCase(createPlantRecord.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createPlantRecord.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.status = "succeeded";
    });
    builder.addCase(createPlantRecord.rejected, (state, action) => {
      state.status = "failed";
      const errors = action.payload as ErrorResponse;
      state.error = errors;
    });
    builder.addCase(createPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.status = "succeeded";
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

export const selectPlantRecord = (state: RootState) => state.plantRecords

export default plantRecordSlice.reducer