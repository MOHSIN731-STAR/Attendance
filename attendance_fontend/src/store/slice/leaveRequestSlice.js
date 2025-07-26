// src/store/slices/leaveSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeaveRequests = createAsyncThunk(
  "leaves/fetchLeaveRequests",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/auth/admin/leaves",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateLeaveStatus = createAsyncThunk(
  "updateLeaveStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/auth/admin/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const leaveSlice = createSlice({
  name: "leaves",
  initialState: {
    leaveRequests: [],
    loading: false,
    error: null,
    updating: false,
    updateError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaveRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaveRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.leaveRequests = action.payload;
      })
      .addCase(fetchLeaveRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLeaveStatus.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        state.updating = false;
        const { id, status } = action.payload;
        // Update the specific leave request in the state
        state.leaveRequests = state.leaveRequests.map((request) =>
          request._id === id ? { ...request, status } : request
        );
      })
      .addCase(updateLeaveStatus.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
      });
  },
});

export default leaveSlice.reducer;
