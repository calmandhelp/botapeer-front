import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PlaceApi, PlaceResponse } from 'botapeer-openapi/typescript-axios';
import type { RootState } from 'redux/store/store'

export type PlaceData = {
  data: PlaceResponse | PlaceResponse[] | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: undefined | string;
};

const initialState: PlaceData = {
  data: null,
  status: "idle",
  error: undefined,
};

const placeApi = new PlaceApi();

export const fetchPlaces = createAsyncThunk(
  'place/fetchPlaceStatus',
  async () => {
    const response = await placeApi.getPlaces();
    return response
  }
)

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaces.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchPlaces.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.status = "succeeded";
    });
    builder.addCase(fetchPlaces.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  }
})

export const selectPlace = (state: RootState) => state.places

export default placeSlice.reducer