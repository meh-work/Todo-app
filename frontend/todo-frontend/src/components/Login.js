import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username: ", formData.username);  // Log username to console
    console.log("Password: ", formData.password);  // Log password to console
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login", 
        formData,
        {
            headers: {
              'Content-Type': 'application/json', // Ensure it's being sent as JSON
            },
        }
      );
      console.log("Data: ", data);  // Log response data to console
      localStorage.setItem("token", data.token);
      alert("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error: ", error);  // Log error to console
      alert(error.response?.data?.message || error.message || "Login Failed");
    }
  };

  return (
    <div className="dashboard-container">
        <div className="dashboard-header"><h2>Login</h2></div>
      <form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username} // Added value for controlled input
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password} // Added value for controlled input
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
