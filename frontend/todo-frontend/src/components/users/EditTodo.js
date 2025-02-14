import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditTodo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { todo } = location.state || {};

  const [editTask, setEditTask] = useState(todo?.task || "");
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(todo?.image ? `http://localhost:5000/${todo.image}` : null);

  useEffect(() => {
    if (!todo) {
      navigate("/dashboard"); // Redirect if no todo found
    }
  }, [todo, navigate]);

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("task", editTask);
      if (editImage) {
        formData.append("image", editImage);
      }

      await axios.put(`http://localhost:5000/api/todos/${todo._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Error updating todo");
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleEditSubmit}>
        <input
          type="text"
          value={editTask}
          onChange={(e) => setEditTask(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={handleEditImageChange} />
        {editImagePreview && (
          <div>
            <img src={editImagePreview} alt="Preview" style={{ maxWidth: "200px", maxHeight: "200px" }} />
          </div>
        )}
        <button type="submit">Update Todo</button>
      </form>
    </div>
  );
};

export default EditTodo;
