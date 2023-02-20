import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreatePlantRecordRequest, PlantRecordResponse, PlantRecordApi, CreatePostRequest } from 'botapeer-openapi/typescript-axios';
import { RootState } from 'redux/store/store'
import { setupAuthConfig } from 'util/redux/apiBaseUtils';
import axios from 'axios'

const plantRecordApi = new PlantRecordApi();

export type PlantRecordData = {
  data: PlantRecordResponse | PlantRecordResponse[] | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: undefined | string;
};

const initialState: PlantRecordData = {
  data: null,
  status: "idle",
  error: undefined,
};

export const createPlantRecord = createAsyncThunk(
  'plantRecord/createPlantRecordStatus',
  async (data: CreatePlantRecordRequest) => {
    const response = await plantRecordApi.createPlantRecord(data, setupAuthConfig());
    return response
  }
)

export const fetchPlantRecordByUserId = createAsyncThunk(
  'plantRecord/fetchPlantRecordStatus',
  async (userId: number) => {
    const response = await plantRecordApi.getPlantRecordByUserId(userId.toString())
    return response
  }
)

export const createPost = createAsyncThunk(
  'plantRecord/createPost',
  async (data: CreatePostRequest) => {
    const formData = new FormData();
    formData.append('formData', JSON.stringify(data.formData));
    formData.append('image', data.image);
    const response = await axios.post('http://localhost:3000/api/120/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  }
)

export const plantRecordSlice = createSlice({
  name: 'plantRecord',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlantRecordByUserId.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchPlantRecordByUserId.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.status = "succeeded";
    });
    builder.addCase(fetchPlantRecordByUserId.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
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
      state.error = action.error.message;
    });
    builder.addCase(createPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      console.log(state.data);
      const data = Object.assign({}, state.data, {posts: action.payload.data});
      state.data = data
      state.status = "succeeded";
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  }
})

export const selectPlantRecord = (state: RootState) => state.plantRecords

export default plantRecordSlice.reducer