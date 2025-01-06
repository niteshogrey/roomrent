import { createSlice } from "@reduxjs/toolkit";
import {
  createHotel,
  getAllHotels,
  findNearestHotels,
  filterHotels,
  getOneHotel,
  updateHotel,
  deleteHotel,
} from "./hotelsAPI";
const initialState = {
  hotels: [],
  currentHotel: null,
  status: "idle",
  error: null,
  filters: {
    name: "",
    minPrice: "",
    maxPrice: "",
    room: "",
    wifi: "",
    sort: "", // 'lowToHigh' or 'highToLow'
  },
  nearbyHotels: [], // Store nearby hotels
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  isLoading: false,
  isError: null,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }; // Set the filters
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Hotel
      .addCase(createHotel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hotels.push(action.payload.data); // Push the newly created hotel
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Get All Hotels
      .addCase(getAllHotels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllHotels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hotels = action.payload; // Set the fetched hotels
      })
      .addCase(getAllHotels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Find Nearest Hotels
      .addCase(findNearestHotels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(findNearestHotels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hotels = action.payload.data; // Set the nearby hotels
      })
      .addCase(findNearestHotels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Filter Hotels
      .addCase(filterHotels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filterHotels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hotels = action.payload.data; // Set the filtered hotels
      })
      .addCase(filterHotels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getOneHotel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOneHotel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentHotel = action.payload;
      })
      .addCase(getOneHotel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateHotel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.hotels.findIndex(
          (hotel) => hotel.phone === action.payload.phone
        );
        if (index !== -1) {
          state.hotels[index] = action.payload;
        }
      })
      .addCase(updateHotel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteHotel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hotels = state.hotels.filter(
          (hotel) => hotel.phone !== action.meta.arg
        );
      })
      .addCase(deleteHotel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilters } = hotelSlice.actions;
export default hotelSlice.reducer;
