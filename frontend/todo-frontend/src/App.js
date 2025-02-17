import "../src/styles/App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Dashboard from "./components/users/Dashboard";
import EditTodo from "./components/users/EditTodo";
import AssignTask from "./components/users/AssignTask";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import { isExpired } from "react-jwt";
import {
  adminDashboardFrontendRoute,
  adminLoginFrontendRoute,
  userAssignTaskFrontendRoute,
  userDashboardFrontendRoute,
  userLoginFrontendRoute,
  userRegisterFrontendRoute,
  userTodoEditFrontendRoute,
  userViewProfileFrontendRoute,
} from "./routes/routes";
import Profile from "./components/users/Profile";

// Protected Layout Component (For Authenticated Routes)
const ProtectedLayout = ({ admin }) => {
  const token = localStorage.getItem("token");

  if (!token || isExpired(token)) {
    localStorage.removeItem("token");
    return (
      <Navigate to={admin ? adminLoginFrontendRoute : userLoginFrontendRoute} />
    );
  }

  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={userLoginFrontendRoute} element={<Login />} />
        <Route path={adminLoginFrontendRoute} element={<AdminLogin />} />
        <Route path={userRegisterFrontendRoute} element={<Register />} />

        {/* Protected Routes for Users */}
        <Route element={<ProtectedLayout />}>
          <Route path={userDashboardFrontendRoute} element={<Dashboard />} />
          <Route path={userTodoEditFrontendRoute} element={<EditTodo />} />
          <Route path={userViewProfileFrontendRoute} element={<Profile />} />
          <Route path={userAssignTaskFrontendRoute} element={<AssignTask />} />
        </Route>

        {/* Protected Routes for Admin */}
        <Route element={<ProtectedLayout admin />}>
          <Route
            path={adminDashboardFrontendRoute}
            element={<AdminDashboard />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
