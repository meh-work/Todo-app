import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignTask,
  fetchUsers,
} from "../../redux/actions/adminActions/todoActions";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

const AssignTask = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { users, loading, error } = useSelector((state) => state.users || {});
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState("");
  const [task, setTask] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [token, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser && task) {
      dispatch(assignTask(selectedUser, task, token, navigate));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f4f6f9",
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 480,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          sx={{ position: "absolute", top: 16, left: 16, color: "#3498db" }}
        >
          ⬅ Back
        </Button>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 3,
            color: "#2c3e50",
          }}
        >
          Assign Task to User
        </Typography>

        {loading && (
          <CircularProgress
            sx={{ display: "block", margin: "0 auto", color: "#3498db" }}
          />
        )}
        {error && (
          <Typography color="error" sx={{ textAlign: "center", marginTop: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>User</InputLabel>
              <Select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                label="User"
                disabled={loading}
                sx={{ backgroundColor: "#fff" }}
              >
                <MenuItem value="">
                  <em>Select a User</em>
                </MenuItem>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.username}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No users found</MenuItem>
                )}
              </Select>
            </FormControl>

            <TextField
              label="Task"
              variant="outlined"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
              fullWidth
              disabled={loading}
              placeholder="Enter task details..."
              sx={{ backgroundColor: "#fff" }}
            />

            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              color="primary"
              sx={{
                padding: "12px",
                fontWeight: "bold",
                marginTop: 2,
                "&:hover": {
                  backgroundColor: "#2980b9",
                },
              }}
            >
              Assign Task
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AssignTask;
