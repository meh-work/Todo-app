import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/users/Login';
import Register from './components/users/Register';
import Dashboard from './components/users/Dashboard';
import EditTodo from './components/users/EditTodo';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/edit-todo/:id" element={<EditTodo/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
