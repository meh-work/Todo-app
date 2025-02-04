import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [image, setImage] = useState(null)
  const navigate = useNavigate();

  // Fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirect to login if no token found
        return;
      }

      const response = await axios.get("http://localhost:5000/api/todos", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setTodos(response.data); // Store todos in state
    } catch (error) {
      console.error("Error fetching todos:", error);
      alert("Error fetching todos");
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos when component mounts
  });

  const handleAddTodo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect to login if no token found
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/todos",
        { task: newTask, image: image},
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response: ",response)
      setTodos([...todos, response.data]); // Add the new todo to the list
      setNewTask("");
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Error adding todo");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect to login if no token found
        return;
      }

      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setTodos(todos.filter(todo => todo._id !== id)); // Remove the deleted todo from state
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Error deleting todo");
    }
  };

  const handleUpdateTodo = async (id, task, isCompleted) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect to login if no token found
        return;
      }

      const updatedTodo = {
        task,
        isCompleted: !isCompleted,
      };

      const response = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        updatedTodo,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update the todos list with the updated todo
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Error updating todo");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  }

  return (
    <div className="dashboard-container">
      <button className="logout" onClick={handleLogout}>Logout</button>
      <h2 className="dashboard-header">Welcome to Your Dashboard</h2>
      <div className="task-input-container">
        <input
          className="task-input"
          type="text"
          placeholder="Add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button className="add-task-button" onClick={handleAddTodo}>Add Task</button>
      </div>
      <div className="todo-list-container">
        <h3>Your Todo List</h3>
        {todos.length > 0 ? (
          <ul 
            style={{
              listStyleType: 'none', 
              padding: 0, 
              margin: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px'
            }}
          >
            {todos.map((todo) => (
              <li 
                key={todo._id} 
                style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  backgroundColor: '#f8f9fa',
                  padding: '10px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <input
                    className="todo-checkbox"
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleUpdateTodo(todo._id, todo.task, todo.isCompleted)}
                    style={{
                      accentColor: '#4a90e2',
                      cursor: 'pointer'
                    }}
                  />
                  <span 
                    style={{
                      textDecoration: todo.isCompleted ? 'line-through' : 'none',
                      color: todo.isCompleted ? '#6c757d' : '#333',
                      flex: 1
                    }}
                  >
                    {todo.task}
                  </span>
                </div>
                {todo.image && (
                  <img
                    src={`http://localhost:5000/${todo.image}`}
                    alt="Task"
                    className="todo-image"
                  />
                )}
                <button 
                  onClick={() => handleDeleteTodo(todo._id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#dc3545',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginLeft: '10px'
                  }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{
            textAlign: 'center', 
            color: '#6c757d', 
            fontStyle: 'italic'
          }}>
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
