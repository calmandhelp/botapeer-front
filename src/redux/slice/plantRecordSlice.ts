import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { createPlantRecordBase, fetchPlantRecordBase, PlantRecordRequest, PlantRecordResponse } from 'util/redux/plantRecordUtils';

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
  async (data: PlantRecordRequest) => {
    const response = await createPlantRecordBase(data);
    return response
  }
)

export const fetchPlantRecord = createAsyncThunk(
  'plantRecord/fetchPlantRecordStatus',
  async (userId: number) => {
    const response = await fetchPlantRecordBase(userId)
    return response
  }
)

export const plantRecordSlice = createSlice({
  name: 'plantRecord',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlantRecord.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchPlantRecord.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchPlantRecord.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(createPlantRecord.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createPlantRecord.fulfilled, (state, action) => {
      state.data = action.payload;
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