import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAttendance, updateAttendance } from "../../store/slice/attandenceSlice";

const Attendance = ({ userId }) => {
  const dispatch = useDispatch();
  const { attendances, loading, error } = useSelector(state => state.attendance);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    dispatch(fetchUserAttendance(userId));
  }, [dispatch, userId]);

  const handleRowClick = (record) => {
    setSelectedRecord(record);
    setNewStatus(record.status || "");
  };

  const handleUpdate = async () => {
    if (!selectedRecord) return;
    dispatch(updateAttendance({ id: selectedRecord._id, attendanceData: { status: newStatus } }));

    setSelectedRecord(null);
    setNewStatus("");
  };

  // Merge consecutive Leave records for the same user into one range
  const mergedAttendances = [...attendances]
    .sort((b, a) => {
      const emailA = a.userId?.email || "";
      const emailB = b.userId?.email || "";
      return emailA.localeCompare(emailB);
    })
    .reduce((acc, record) => {
      if (record.status === "Leave") {
        const last = acc[acc.length - 1];
        const currentDate = record.date; // attendance date

        if (
          last &&
          last.status === "Leave" &&
          last.userId?._id === record.userId?._id
        ) {
          // Extend date range if needed
          last.startDate = currentDate && (!last.startDate || currentDate < last.startDate)
            ? currentDate
            : last.startDate;
          last.endDate = currentDate && (!last.endDate || currentDate > last.endDate)
            ? currentDate
            : last.endDate;
        } else {
          // Initialize startDate and endDate from record.date
          acc.push({
            ...record,
            startDate: currentDate,
            endDate: currentDate
          });
        }
      } else {
        acc.push(record);
      }
      return acc;
    }, []);

  return (
    <>
      <h2 className="text-lg font-semibold mb-4 text-center">Attendance</h2>
      {loading && <div className="bg-blue-600 text-white px-4 py-2">Loading...</div>}
      {error && <div className="bg-red-600 text-white px-4 py-2">{error}</div>}

      {mergedAttendances.length > 0 ? (
        <table className="min-w-full rounded-lg border-gray-300 text-sm shadow-lg">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">User</th>
            </tr>
          </thead>
          <tbody>
            {mergedAttendances.map((record, index) => (
              <tr
                key={record._id + index}
                onClick={() => handleRowClick(record)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">
                  {record.status === "Leave" ? "Leave" : "Present"}
                </td>
                <td className="px-4 py-2 text-center">
                  {record.status === "Leave"
                    ? `(${record.startDate?.slice(0, 10)}) — (${record.endDate?.slice(0, 10)})`
                    : record.date?.slice(0, 10) || "No Date"}
                </td>
                <td className="px-4 py-2 text-center">{record.userId?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <div>No attendance records found for User ID: {userId || "All Users"}</div>
      )}

      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-96">
            <h2 className="text-lg font-semibold mb-4">Update Attendance Status</h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            >
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => { setSelectedRecord(null); setNewStatus(""); }}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Attendance;
