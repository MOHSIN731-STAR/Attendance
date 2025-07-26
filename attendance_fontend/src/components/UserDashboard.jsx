import React from "react";
import { Layout, Menu } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import LeaveRequest from '../usercomponents/LeaveRequest/LeaveRequest';
import MarkAttendance from "../usercomponents/MarkAttendance/MarkAttendance";
import AttendanaceUser from "../usercomponents/Attendanceuser/AttendanceUser";
import LeaveStatusList from "../usercomponents/LeaveStatusList/LeaveStatusList";
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

const UserDashboard = () => {
  const menuItems = [
    { key: "1", label: <Link to="/user/MarkAttendance">MarkAttendance</Link> },
    { key: "2", label: <Link to="/user/Attendance">User Attendance</Link> },
    { key: "3", label: <Link to="/user/leave">Leave </Link> },
    { key: "4", label: <Link to="/user/LeaveApproval">Leave Approval</Link> },
    
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
              <Route path="MarkAttendance" element={<MarkAttendance/>} />
              <Route path="Attendance" element={<AttendanaceUser/>} />
              <Route path="leave" element={<LeaveRequest/>} />
              <Route path="LeaveApproval" element={<LeaveStatusList/>} />
              
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </ErrorBoundary>
  );
};

export default UserDashboard;
