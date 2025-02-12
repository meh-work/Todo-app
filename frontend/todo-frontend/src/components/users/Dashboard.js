import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard.css";
import { userLoginFrontendRoute } from "../../routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions/userAuthActions";
import { userFetchTodos } from "../../redux/actions/userActions/userTodoActions";
import { tokenValidator } from "../../services/tokenValidator";

const Dashboard = () => {
  const [newTask, setNewTask] = useState("");
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userTodos = useSelector((state) => state.userTodos.userTodos.todos) || [];

  useEffect(() => {
      tokenValidator(token, dispatch, navigate, "USER_LOGIN_FAILURE", () => {
          dispatch(userFetchTodos(token));
      }, false);
  }, [token]);

  const handleAddTodo = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("task", newTask);
      if (image) formData.append("image", image);

      await axios.post("http://localhost:5000/api/todos", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setNewTask("");
      setImage(null);
      setImagePreview(null);
      dispatch(userFetchTodos(token)); // Refetch todos after adding
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Error adding todo");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!token) {
      navigate(userLoginFrontendRoute);
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(userFetchTodos(token)); // Refetch todos after deletion
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Error deleting todo");
    }
  };

  const handleUpdateTodo = async (id, task, isCompleted) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { task, isCompleted: !isCompleted },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(userFetchTodos(token)); // Refetch todos after update
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Error updating todo");
    }
  };

  return (
    <div className="dashboard-container">
      <button className="logout" onClick={() => dispatch(logout(navigate))}>
        Logout
      </button>
      <h2 className="dashboard-header">Welcome to Your Dashboard</h2>

      <div className="task-input-container">
        <input type="text" placeholder="Add new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="todo-image" />}
        <button onClick={handleAddTodo}>Add Task</button>
      </div>

      <div className="todo-list-container">
        <h3>Your Todo List</h3>
        {userTodos.length > 0 ? (
          <table className="todo-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Completed</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userTodos.map((todo) => (
                <tr key={todo._id}>
                  <td title={todo.task}>
                    {todo.task.length > 10 ? todo.task.substring(0, 10) + "..." : todo.task}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => handleUpdateTodo(todo._id, todo.task, todo.isCompleted)}
                    />
                  </td>
                  <td>
                    {todo.image ? (
                      <button onClick={() => setSelectedImage(`http://localhost:5000/${todo.image}`)}>View Image</button>
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <button className="todo-task-button" onClick={() => navigate(`/edit-todo/${todo._id}`, { state: { todo } })}>Edit</button>
                    <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tasks found</p>
        )}
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

export default Dashboard;
