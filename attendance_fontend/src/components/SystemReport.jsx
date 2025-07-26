import React, { useState } from "react";
import axios from "axios";

const SystemReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const fetchReport = async () => {
  if (!fromDate || !toDate) {
    setError("Please select both dates");
    return;
  }
  setLoading(true);
  setError("");

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5000/auth/admin/system-report",
      { fromDate, toDate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setReport(res.data);
  } catch (err) {
    console.error(err);
    setError("Failed to fetch report");
  }
  setLoading(false);
};


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">System Attendance Report</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-center">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
        <button
          onClick={fetchReport}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Get Report"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {report.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">User</th>
                <th className="py-2 px-4 border-b">Present</th>
                <th className="py-2 px-4 border-b">Absent</th>
                <th className="py-2 px-4 border-b">Leave</th>
                <th className="py-2 px-4 border-b">Grade</th>
              </tr>
            </thead>
            <tbody>
              {report.map((r, idx) => (
                <tr key={idx} className="text-center">
                  <td className="py-2 px-4 border-b">{r.user}</td>
                  <td className="py-2 px-4 border-b">{r.presentCount}</td>
                  <td className="py-2 px-4 border-b">{r.absentCount}</td>
                  <td className="py-2 px-4 border-b">{r.leaveCount}</td>
                  <td className="py-2 px-4 border-b">{r.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SystemReport;
