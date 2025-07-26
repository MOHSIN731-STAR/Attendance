import React, { useState } from "react";
import axios from "axios";

const LeaveRequest = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/users/leave",   // <-- apni backend URL replace karein
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(res.data.msg || "Leave request submitted successfully!");
      setFormData({ startDate: "", endDate: "", reason: "" }); // reset form
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Leave Request</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter reason for leave"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>

      {message && (
        <div className="mt-4 text-green-600 font-medium text-center">{message}</div>
      )}
      {error && (
        <div className="mt-4 text-red-600 font-medium text-center">{error}</div>
      )}
    </div>
  );
};

export default LeaveRequest;
