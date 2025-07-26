import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Adjust your backend URL here
const BASE_URL = "http://localhost:5000"; 

// Fetch attendance (all or by userId)
export const fetchUserAttendance = createAsyncThunk(
  "attendance/fetch",
  async (userId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const url = userId
        ? `${BASE_URL}/auth/admin/attendance?userId=${userId}`
        : `${BASE_URL}/auth/admin/attendance`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Submit attendance (POST)
export const submitUserAttendance = createAsyncThunk(
  "attendance/submit",
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${BASE_URL}/auth/admin/attendance`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Update attendance (PUT)
export const updateAttendance = createAsyncThunk(
  "attendance/update",
  async ({ id, attendanceData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${BASE_URL}/auth/admin/attendance/${id}`, attendanceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    attendances: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchUserAttendance
      .addCase(fetchUserAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendances = action.payload;
      })
      .addCase(fetchUserAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateAttendance
      .addCase(updateAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRecord = action.payload;
        const index = state.attendances.findIndex(item => item._id === updatedRecord._id);
        if (index !== -1) {
          state.attendances[index] = updatedRecord; // update in local state
        }
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
