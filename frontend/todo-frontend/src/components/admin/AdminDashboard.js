import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTodos } from "../../redux/actions/admin/todoActions";
import { login, logout } from "../../redux/actions/admin/authActions";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const todos = useSelector((state) => state.todos.todos);
  const totalResults = useSelector((state) => state.todos.totalResults);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
        if (!token) {
          dispatch({ type: "FETCH_TODOS_FAILURE" });
          dispatch(login(navigate));
          return;
        }
        dispatch(fetchTodos(page, token));
  }, [dispatch, page, token, navigate]);

  return (
    <div className="dashboard-container">
      <button className="logout" onClick={() => dispatch(logout(navigate))}>Logout</button>
      <h1 className="dashboard-header">Admin Dashboard</h1>

      <table className="todo-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Task</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <tr key={todo._id}>
                <td>{todo.username || "Unknown"}</td>
                <td>{todo.task}</td>
                <td>
                    {todo.image ? (
                        <button onClick={() => setSelectedImage(`http://localhost:5000/${todo.image}`)}>View Image</button>
                    ) : (
                        "Null"
                    )}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="2">No tasks available</td></tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</button>
        <span>Page {page} of {Math.ceil(totalResults / 10)}</span>
        <button onClick={() => setPage((prev) => prev + 1)} disabled={page * 10 >= totalResults}>Next</button>
      </div>

      {selectedImage && (
        <div className="image-preview-overlay" onClick={() => setSelectedImage(null)}>
            <div className="image-preview">
                <img src={selectedImage} alt="Task Preview" />
                <button onClick={() => setSelectedImage(null)}>Close</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
