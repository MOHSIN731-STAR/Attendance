import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAttendance } from "./../../store/slice/attandenceGetslice";

const UsergetAttendance = () => {
  const dispatch = useDispatch();
  const { attendance1, loading, error } = useSelector(
    (state) => state.attendance // Matches slice name
  );

  useEffect(() => {
    dispatch(fetchUserAttendance());
  }, [dispatch]);

  // Format date for readability
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString; // Fallback if date is invalid
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && (
        <p>Error: {typeof error === "string" ? error : "An error occurred"}</p>
      )}
      {!loading && !error && (!attendance1 || attendance1.length === 0) && (
        <p>No attendance records found.</p>
      )}
      {!loading &&
        !error &&
        Array.isArray(attendance1) &&
        attendance1.length > 0 && (
          <div>
            {attendance1.map((atte) => (
              <div key={atte._id} style={{ marginBottom: "1rem" }}>
                <p>Date: {formatDate(atte.date)}</p>
                <p>Status: {atte.status}</p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default UsergetAttendance;
