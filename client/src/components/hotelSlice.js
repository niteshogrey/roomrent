import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [], // Store hotel data here
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload; // Replace existing hotels with new data
    },
  },
});

export const { setHotels } = hotelSlice.actions;
export default hotelSlice.reducer;
