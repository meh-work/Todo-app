import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTodos } from "../../redux/actions/adminActions/todoActions";
import { logout } from "../../redux/actions/adminActions/authActions";
import "../../styles/AdminDashboard.css";
import { userAssignTaskFrontendRoute } from "../../routes/routes";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const todos = useSelector((state) => state.todos.todos);
  const totalResults = useSelector((state) => state.todos.totalResults);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(fetchTodos(page, token));
    console.log("Fetched todos for admin: ", todos);
  }, [page, token]);

  return (
    <div className="dashboard-container">
      <button
        onClick={() => navigate(userAssignTaskFrontendRoute)}
        className="assign-task-btn"
      >
        Assign Task
      </button>
      <button className="logout" onClick={() => dispatch(logout(navigate))}>
        Logout
      </button>
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
                    <button
                      onClick={() =>
                        setSelectedImage(`http://localhost:5000${todo.image}`)
                      }
                    >
                      View Image
                    </button>
                  ) : (
                    "No Image"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(totalResults / 10)}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * 10 >= totalResults}
        >
          Next
        </button>
      </div>

      {selectedImage && (
        <div
          className="image-preview-overlay"
          onClick={() => setSelectedImage(null)}
        >
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
