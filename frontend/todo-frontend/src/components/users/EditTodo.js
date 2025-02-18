import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  userDashboardFrontendRoute,
  userLoginFrontendRoute,
} from "../../routes/routes";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const EditTodo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { todo } = location.state || {};

  const [editTask, setEditTask] = useState(todo?.task || "");
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(
    todo?.image ? `http://localhost:5000/${todo.image}` : null
  );

  useEffect(() => {
    if (!todo) {
      navigate(userDashboardFrontendRoute);
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
        navigate(userLoginFrontendRoute);
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

      navigate(userDashboardFrontendRoute);
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Error updating todo");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Edit Task
          </Typography>
          <form onSubmit={handleEditSubmit}>
            <TextField
              fullWidth
              label="Task Name"
              variant="outlined"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <IconButton component="label">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleEditImageChange}
                />
                <PhotoCamera />
              </IconButton>
              <Typography variant="body2">Upload Image</Typography>
            </Box>
            {editImagePreview && (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <img
                  src={editImagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Todo
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditTodo;
