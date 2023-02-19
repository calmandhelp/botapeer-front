import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreatePlantRecordRequest, PlantRecordResponse, PlantRecordApi } from 'botapeer-openapi/typescript-axios';
import { RootState } from 'redux/store/store'

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
    const response = await plantRecordApi.createPlantRecord(data);
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
  }
})

export const selectPlantRecord = (state: RootState) => state.plantRecords

export default plantRecordSlice.reducer