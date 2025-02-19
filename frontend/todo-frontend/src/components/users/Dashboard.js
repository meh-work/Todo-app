import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions/userAuthActions";
import {
  userFetchTodos,
  userViewProfile,
} from "../../redux/actions/userActions/userTodoActions";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Avatar,
  Box,
  Modal,
  Fade,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import {
  Delete,
  Edit,
  Logout,
  AccountCircle,
  Visibility,
} from "@mui/icons-material";

const Dashboard = () => {
  const [newTask, setNewTask] = useState("");
  const [image, setImage] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [filter, setFilter] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalResults = useSelector((state) => state.userTodos.totalUserResults);
  const token = useSelector((state) => state.auth.token);
  const userTodos =
    useSelector((state) => state.userTodos.userTodos.todos) || [];

  useEffect(() => {
    console.log("Total result: ", totalResults);
    dispatch(userFetchTodos(page, token));
  }, [page, token, dispatch]);

  const handleAddTodo = async () => {
    try {
      const formData = new FormData();
      formData.append("task", newTask);
      if (image) formData.append("image", image);

      await axios.post("http://localhost:5000/api/todos", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setNewTask("");
      setImage(null);
      setImagePreview(null);
      dispatch(userFetchTodos(token));
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Error adding todo");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(userFetchTodos(token));
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Error deleting todo");
    }
  };

  const handleUpdateTodo = async (id, task, isCompleted, image) => {
    try {
      await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { task, isCompleted: !isCompleted, image },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(userFetchTodos(token));
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Error updating todo");
    }
  };

  const filteredTodos = userTodos.filter((todo) => {
    if (filter.includes("completed") && !todo.isCompleted) return false;
    if (filter.includes("withImages") && !todo.image) return false;
    if (
      filter.includes("assignedByAdmin") &&
      (!todo.assignedBy || todo.assignedBy.userType !== "Admin")
    )
      return false;
    return true;
  });

  return (
    <Container>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button
            color="inherit"
            startIcon={<AccountCircle />}
            onClick={() => dispatch(userViewProfile(token, navigate))}
          >
            Profile
          </Button>
          <Button
            color="inherit"
            startIcon={<Logout />}
            onClick={() => dispatch(logout(navigate))}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        <TextField
          label="Add new task"
          variant="outlined"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: "10px" }}
        />
        {imagePreview && (
          <Avatar src={imagePreview} sx={{ width: 80, height: 80 }} />
        )}
        <Button variant="contained" onClick={handleAddTodo}>
          Add Task
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">Filter Tasks:</Typography>
        <Select
          multiple
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select filters
          </MenuItem>
          <MenuItem value="completed">Show Completed</MenuItem>
          <MenuItem value="withImages">Show With Images</MenuItem>
          <MenuItem value="assignedByAdmin">Show Assigned by Admin</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTodos.map((todo) => (
              <TableRow key={todo._id}>
                <TableCell>{todo.task}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      handleUpdateTodo(
                        todo._id,
                        todo.task,
                        todo.isCompleted,
                        todo.image
                      )
                    }
                  >
                    {todo.isCompleted ? "✅" : "⭕"}
                  </IconButton>
                </TableCell>
                <TableCell>
                  {todo.image ? (
                    <Tooltip
                      title={
                        <Avatar src={`http://localhost:5000/${todo.image}`} />
                      }
                    >
                      <IconButton
                        onClick={() =>
                          setSelectedImage(
                            `http://localhost:5000/${todo.image}`
                          )
                        }
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      navigate(`/edit-todo/${todo._id}`, { state: { todo } })
                    }
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTodo(todo._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(totalResults / 10)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>

      <Modal
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
      >
        <Fade in={Boolean(selectedImage)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 2,
              boxShadow: 24,
              borderRadius: 2,
            }}
          >
            <img
              src={selectedImage}
              alt="Task Preview"
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setSelectedImage(null)}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default Dashboard;
