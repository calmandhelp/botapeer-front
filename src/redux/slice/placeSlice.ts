import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ErrorResponse, PlaceApi, PlaceResponse } from 'botapeer-openapi/typescript-axios';
import type { RootState } from 'redux/store/store'

export type PlaceData = {
  data: PlaceResponse | PlaceResponse[] | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: ErrorResponse | undefined
};

const initialState: PlaceData = {
  data: null,
  status: "idle",
  error: undefined,
};

const placeApi = new PlaceApi();

export const fetchPlaces = createAsyncThunk(
  'place/fetchPlaceStatus',
  async (_, thunkAPI) => {
  try {
    const response = await placeApi.getPlaces();
    return response
  } catch(error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
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
      const errors = action.payload as ErrorResponse;
      state.error = errors;
    });
  }
})

export const selectPlace = (state: RootState) => state.places

export default placeSlice.reducer