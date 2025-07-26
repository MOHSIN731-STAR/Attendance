import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch attendance records
export const adminget = createAsyncThunk(
  "auth/adminget",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/auth/admin/attendance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateAttendance = createAsyncThunk(
  "auth/updateAttendance",
  async ({ id, attendanceData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/auth/admin/attendance/${id}`,
        attendanceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [], // Array of attendance records
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle adminget
    builder
      .addCase(adminget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminget.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Expecting an array of records
      })
      .addCase(adminget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updateAttendance
      .addCase(updateAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.loading = false;
        // Update the specific record in the user array
        state.user = state.user.map((record) =>
          record._id === action.payload._id ? action.payload : record
        );
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
