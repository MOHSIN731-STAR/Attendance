import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Use named import

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(null); // Clear previous errors
      console.log("Request payload:", { email, password });

      const res = await axios.post(
        "http://localhost:5000/auth/user_re/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Full response:", res);
      console.log("Response data:", res.data);

      // Check for token
      const token = res.data.token;
      if (!token) {
        console.log("Token is missing in response:", res.data);
        setError("Token is missing in response");
        return;
      }

      // Decode JWT
      let decoded;
      try {
        decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);

        // Store token in localStorage
        localStorage.setItem("token", token);
      } catch (err) {
        console.error("JWT decode error:", err);
        setError("Failed to decode token");
        return;
      }

      // Extract role
      const role = decoded.role;
      if (!role) {
        console.log("Role is missing in decoded token:", decoded);
        setError("Role is missing in decoded token");
        return;
      }

      // Navigate based on role
      if (role.toLowerCase() === "admin") {
        console.log("Navigating to admin-dashboard");
        navigate("/admin-dashboard");
      } else if (role.toLowerCase() === "user") {
        console.log("Navigating to user-dashboard");
        navigate("/user-dashboard");
      } else {
        console.log("Invalid role detected:", role);
        setError(`Invalid role: ${role}`);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      const message = error.response?.data?.message || error.message;
      setError(`Login failed: ${message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => {
            console.log("Email input:", e.target.value);
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => {
            console.log("Password input:", e.target.value);
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={() => {
            console.log("Button clicked");
            handleLogin();
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

// Error Boundary to prevent white screen
class LoginWithErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh the page.</h1>;
    }
    return <Login />;
  }
}

export default LoginWithErrorBoundary;
