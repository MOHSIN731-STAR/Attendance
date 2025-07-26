import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceList = () => {
  const [groupedAttendance, setGroupedAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/auth/users/attendance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        // Group by status
        const grouped = data.reduce((acc, item) => {
          const status = item.status;
          if (!acc[status]) {
            acc[status] = [];
          }
          acc[status].push(new Date(item.date).toLocaleDateString());
          return acc;
        }, {});

        setGroupedAttendance(grouped);
      } catch (err) {
        setError("Failed to load attendance");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">My Attendance</h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {Object.keys(groupedAttendance).length === 0 && !loading && (
          <p className="text-gray-500">No attendance records found.</p>
        )}

        {Object.entries(groupedAttendance).map(([status, dates]) => (
          <div
            key={status}
            className="bg-white shadow-md rounded-lg p-3"
          >
            <p className="font-semibold capitalize mb-2">
              {status} – {dates.length} {dates.length === 1 ? "day" : "days"}
            </p>
            <p className="text-gray-700">{dates.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceList;
