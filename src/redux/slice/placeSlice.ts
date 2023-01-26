import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { fetchPlaceBase, PlaceResponse } from 'util/redux/placeUtils';

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

export const fetchPlaces = createAsyncThunk(
  'place/fetchPlaceStatus',
  async () => {
    const response = await fetchPlaceBase()
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
      state.data = action.payload;
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