import { configureStore } from '@reduxjs/toolkit';
import hotelReducer from '../features/hotels/hotelsSlice';

export const store = configureStore({
  reducer: {
    hotels: hotelReducer,
  },
});

export default store;
