import React, { useState, useEffect } from "react";
import { Table, Button, Select, message } from "antd";
import { updateLeave } from "../services/Api";

const { Option } = Select;

const LeaveApproval = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // Assume an endpoint to fetch all leave requests (not shown in your backend)
    // Replace with actual API call
    setLeaves([]); // Placeholder
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      await updateLeave(id, status);
      message.success("Leave request updated");
      // Refresh leave requests
    } catch (err) {
      message.error("Failed to update leave request");
    }
  };

  const columns = [
    { title: "User", dataIndex: ["userId", "name"], key: "name" },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
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
          <Option value="Pending">Pending</Option>
          <Option value="Approved">Approved</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>
      ),
    },
  ];

  return <Table columns={columns} dataSource={leaves} rowKey="_id" />;
};

export default LeaveApproval;
