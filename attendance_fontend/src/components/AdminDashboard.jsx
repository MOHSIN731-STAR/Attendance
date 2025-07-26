import React from "react";
import { Layout, Menu } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import AttendanceList from "../components/AttendanceList";
import LeaveApproval from "../components/LeaveApproval";
import UserReport from "../components/UserReport";
import SystemReport from "../components/SystemReport";
import Attendance from '../components/attendance/Attendance'
import LeaveRequest from '../components/leaveRequest/LeaveRequest';
import Register from "../components/Register";
import UserList from "../components/UserList/UserList";

const { Header, Content, Sider } = Layout;

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const AdminDashboard = () => {
  const menuItems = [
    { key: "1", label: <Link to="/admin/all_users">All Users</Link> },
    { key: "2", label: <Link to="/admin/register">Register</Link> },
    { key: "3", label: <Link to="/admin/attendance">Attendance</Link> },
    { key: "4", label: <Link to="/admin/leave">Leave Approval</Link> },
    { key: "5", label: <Link to="/admin/user-report">User Report</Link> },
    { key: "6", label: <Link to="/admin/system-report">System Report</Link> },
  ];

  return (
    <ErrorBoundary>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={menuItems}
          />
        </Sider>
        <Layout>
          {/* <Header style={{ background: "#fffff", padding: 0 }} /> */}
          <Content style={{ margin: "16px" }}>
            <Routes>
              <Route path="all_users" element={<UserList/>} />
              <Route path="register" element={<Register/>} />
              <Route path="attendance" element={<Attendance/>} />
              <Route path="leave" element={<LeaveRequest/>} />
              <Route path="user-report" element={<UserReport />} />
              <Route path="system-report" element={<SystemReport />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </ErrorBoundary>
  );
};

export default AdminDashboard;
