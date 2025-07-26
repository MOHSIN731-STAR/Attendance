import React, { useState, useEffect } from "react";
import { Table, Button, Select, message } from "antd";
import {
  getAllAttendance,
  updateAttendance,
  deleteAttendance,
} from "../services/Api";

const { Option } = Select;

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      const { data } = await getAllAttendance();
      setAttendances(data);
    } catch (err) {
      message.error("Failed to load attendances");
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      await updateAttendance(id, status);
      message.success("Attendance updated");
      fetchAttendances();
    } catch (err) {
      message.error("Failed to update attendance");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAttendance(id);
      message.success("Attendance deleted");
      fetchAttendances();
    } catch (err) {
      message.error("Failed to delete attendance");
    }
  };

  const columns = [
    { title: "User", dataIndex: ["userId", "name"], key: "name" },
    { title: "Email", dataIndex: ["userId", "email"], key: "email" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleUpdate(record._id, value)}
        >
          <Option value="Present">Present</Option>
          <Option value="Absent">Absent</Option>
          <Option value="Leave">Leave</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={attendances} rowKey="_id" />;
};

export default AttendanceList;
