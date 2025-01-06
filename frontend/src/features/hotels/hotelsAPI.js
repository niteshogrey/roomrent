import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1'

// API call to create a hotel
export const createHotel = createAsyncThunk(
  "hotels/createHotel",
  async ({ hotel, images }, thunkAPI) => {
    try {
      const formData = new FormData();

      Object.entries(hotel).forEach(([key, value]) => {
        console.log(`Appending to FormData: ${key} = ${value}`);
        formData.append(key, value);
      });

      images.forEach((image, index) => {
        console.log(`Appending image #${index}:`, image); // Log each image
        formData.append("images", image);
      });

      // Verify FormData
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const response = await axios.post("http://localhost:8000/api/v1/hotels/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// API call to fetch all hotels
export const getAllHotels = createAsyncThunk(
  "hotels/getAllHotels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/hotels/hotels"); // Correct endpoint
      return response.data; // Assuming response.data contains the hotels array
    } catch (error) {
      console.error("Error fetching hotels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// API call to find nearest hotels

export const findNearestHotels = createAsyncThunk(
  'hotels/findNearestHotels',
  async (locationData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/hotels/find-nearest', locationData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Assuming response.data contains an array of nearby hotels
    } catch (error) {
      console.error("Error fetching nearest hotels:", error.response?.data || error.message); // Debug log
      const message = error.response?.data?.message || 'Failed to fetch nearest hotels';
      return rejectWithValue(message);
    }
  }
);


// API call to filter hotels based on filters
export const filterHotels = createAsyncThunk(
  'hotels/filterHotels',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/hotels/filter', {
        params: filters, // Pass filters as query parameters
      });
      return response.data; // Assuming response.data contains the filtered hotels
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getOneHotel = createAsyncThunk('hotels/getOne', async (phone, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/hotels/${phone}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateHotel = createAsyncThunk('hotels/update', async ({ phone, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/hotels/${phone}`, updatedData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const deleteHotel = createAsyncThunk('hotels/delete', async (phone, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_URL}/hotels/${phone}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});







