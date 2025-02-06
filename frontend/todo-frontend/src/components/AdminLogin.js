import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../redux/actions/authActions";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ adminname: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header"><h2>Admin Login</h2></div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="adminname"
          placeholder="Username"
          value={formData.adminname}
          onChange={(e) => setFormData({ ...formData, adminname: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      <p>Not an admin? <Link to="/">Login here</Link></p>
    </div>
  );
};

export default AdminLogin;
