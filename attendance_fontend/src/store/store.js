// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import leaveRequestSlice from "./slice/leaveRequestSlice";
import attendanceSlice from "./slice/attandenceSlice";
import attendanceSlicea from "./slice/attandenceGetslice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    leaves: leaveRequestSlice,
    attendance: attendanceSlice,
    attendance1: attendanceSlicea,
  },
});
