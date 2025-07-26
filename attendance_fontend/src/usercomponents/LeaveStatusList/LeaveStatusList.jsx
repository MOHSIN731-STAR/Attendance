import React, { useEffect, useState } from "react";
import axios from "axios";

const LeaveStatusList = () => {
  const [statuses, setStatuses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/users/leave/status", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStatuses(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Something went wrong");
      }
    };

    fetchStatuses();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Leave Approval</h2>

      {error && (
        <div className="mb-4 text-red-600 font-medium text-center">{error}</div>
      )}

      {statuses.length === 0 ? (
        <p className="text-center text-gray-600">No leave requests found</p>
      ) : (
        <ul className="space-y-6">
          {statuses.map((leave, index) => (
            <li
              key={leave._id || index}
              className="bg-gray-100 flex justify-between rounded-xl px-4 py-2 text-center text-gray-700"
            >
             <span className=" font-semibold py-1">Leave Status:</span>  <span className="font-semibold border py-1 px-2 rounded-md bg-blue-600 text-white">{leave.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeaveStatusList;
