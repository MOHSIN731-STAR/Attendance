import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/auth/admin",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Update headers for each request
API.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export const getAllAttendance = () => API.get("/auth/admin/attendance");
export const updateAttendance = (id, status) =>
  API.put(`/attendance/${id}`, { status });
export const deleteAttendance = (id) => API.delete(`/auth/admin/attendance/${id}`);

// Leave APIs
export const updateLeave = (id, status) => API.put(`/auth/admin/leave/${id}`, { status });

// Report APIs
export const generateUserReport = (data) => API.post("/auth/admin/report", data);
export const generateSystemReport = (data) => API.post("/auth/admins/system-report", data);
