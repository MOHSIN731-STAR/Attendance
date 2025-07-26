import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserAttendance
} from "./../../store/slice/attandenceGetslice";

const UserAttendance = () => {
  const dispatch = useDispatch();
  const { attendances, loading, error } = useSelector(
    (state) => state.attendance
  );

  // State for form inputs
  const [formData, setFormData] = useState({
    date: "",
    status: "",
  });

  // Fetch attendance records on mount
  useEffect(() => {
    dispatch(fetchUserAttendance());
  }, [dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitUserAttendance(formData)).then(() => {
      // Reset form after successful submission
      setFormData({
        date: "",
        status: "",
      });
      // Fetch updated attendance records
      dispatch(fetchUserAttendance());
    });
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          User Attendance
        </h2>

        {/* Form for attendance input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="date"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>
        </form>

        {/* Display loading and error states */}
        {loading && <p className="mt-4 text-blue-600">Loading...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {/* Display attendance records */}
        {attendances?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Attendance Records</h3>
            <ul className="space-y-2">
              {attendances.map((attendance, index) => (
                <li key={index} className="p-2 bg-gray-100 rounded-md">
                  Date: {attendance.date}, Status: {attendance.status}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {attendances.map((attandance, id) => {
        return (
          <li key={id} className="p-2 bg-gray-100 rounded-md">
            Date: {attandance.date}, Status: {attandance.status}
          </li>
        );
      })}
    </>
  );
};

export default UserAttendance;
