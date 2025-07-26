import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeaveRequests,
  updateLeaveStatus,
} from "../../store/slice/leaveRequestSlice";

const LeaveRequest = () => {
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const { leaveRequests, loading, error, updating, updateError } = useSelector(
    (state) => state.leaves
  );

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(fetchLeaveRequests());
  }, [dispatch]);

  const handleRowClick = (request) => {
    setSelectedRequest(request);
    setStatus(request.status);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setStatus("");
  };

  const handleStatusUpdate = () => {
    dispatch(updateLeaveStatus({ id: selectedRequest._id, status }))
      .unwrap()
      .then(() => {
        dispatch(fetchLeaveRequests()); // Re-fetch after update
        handleCloseModal();
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Leave Requests</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading &&
        Array.isArray(leaveRequests) &&
        leaveRequests.length === 0 && (
          <p className="text-center">No leave requests found.</p>
        )}

      {!loading && Array.isArray(leaveRequests) && leaveRequests.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border">User</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Reason</th>
                <th className="py-2 px-4 border">Start Date</th>
                <th className="py-2 px-4 border">End Date</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((record) => (
                <tr
                  key={record._id}
                  className="text-center cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(record)}
                >
                  <td className="py-2 px-4 border">
                    {record.userId?.name || "N/A"}
                  </td>
                  <td className="py-2 px-4 border">
                    {record.userId?.email || "N/A"}
                  </td>
                  <td className="py-2 px-4 border">{record.reason}</td>
                  <td className="py-2 px-4 border">
                    {new Date(record.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(record.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Leave Status</h2>
            <p className="mb-2">
              User: {selectedRequest.userId?.name || "N/A"}
            </p>
            <p className="mb-2">
              Email: {selectedRequest.userId?.email || "N/A"}
            </p>
            <p className="mb-4">Reason: {selectedRequest.reason}</p>

            <label className="block mb-2 font-semibold">Change Status:</label>
            <select
              className="w-full border rounded p-2 mb-4"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            {updateError && (
              <p className="text-red-500 mb-2">
                Error:{" "}
                {typeof updateError === "string"
                  ? updateError
                  : updateError?.msg || JSON.stringify(updateError)}
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleStatusUpdate}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequest;
