import "../src/styles/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Dashboard from "./components/users/Dashboard";
import EditTodo from "./components/users/EditTodo";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import { isExpired } from "react-jwt";

const ProtectedRoute = ({ children, admin }) => {
  const token = localStorage.getItem("token");

  if (!token || isExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to={admin ? "/admin-login" : "/"} />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute admin>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-todo/:id"
          element={
            <ProtectedRoute>
              <EditTodo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
