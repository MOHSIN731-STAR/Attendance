import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Attendance from "./components/attendance/Attendance";
import LeaveRequest from "./components/leaveRequest/LeaveRequest";
import UserAttendance from "./components/UserAttendance/UserAttendance";
import UsergetAttendance from "./components/UserAttendance/UsergetAttendance";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />

      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/user/*" element={<UserDashboard />} />

      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/leaveRequest" element={<LeaveRequest />} />
      <Route path="/userAttendance" element={<UserAttendance />} />
      <Route path="/UsergetAttendance" element={<UsergetAttendance />} />

      {/* Add other routes (e.g., login) as needed */}
    </Routes>
  );
}

export default App;
