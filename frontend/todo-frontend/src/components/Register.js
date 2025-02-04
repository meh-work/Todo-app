import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/register", formData);
      alert(data.message || "Registration Successful!");
      navigate("/"); // Redirect to login page after successful registration
    } catch (error) {
        console.log("Error: ",error)
        alert(error.response?.data?.message || error.message || "Registration Failed");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header"><h2>Registration</h2></div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button type="submit">Register</button>
          </form>
          <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Register;
