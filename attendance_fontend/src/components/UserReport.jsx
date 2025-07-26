import React, { useState, useEffect } from "react";

const UserReports = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/admin/users"); // change if needed
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:5000/auth/admin/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, fromDate, toDate }),
      });
      if (!response.ok) throw new Error("Something went wrong!");
      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err.message || "Error fetching report");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Generate Attendance Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
               {user.email}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          required
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Get Report
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {report && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold mb-2 text-center">Report Details</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>User Name:</div>
            <div className="font-medium">{report.userName}</div>
            <div>Present Days:</div>
            <div className="font-medium">{report.presentCount}</div>
            <div>Absent Days:</div>
            <div className="font-medium">{report.absentCount}</div>
            <div>Leave Days:</div>
            <div className="font-medium">{report.leaveCount}</div>
            <div>Grade:</div>
            <div className="font-bold text-green-600">{report.grade}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReports;
