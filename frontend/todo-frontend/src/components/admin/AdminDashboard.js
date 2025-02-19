import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTodos } from "../../redux/actions/adminActions/todoActions";
import { logout } from "../../redux/actions/adminActions/authActions";
import { userAssignTaskFrontendRoute } from "../../routes/routes";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Modal,
  Box,
  IconButton,
  Pagination,
} from "@mui/material";
import { Logout, AddTask, Close, Image } from "@mui/icons-material";

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
  }, [page, token, dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
      {/* Top Buttons */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddTask />}
          onClick={() => navigate(userAssignTaskFrontendRoute)}
        >
          Assign Task
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<Logout />}
          onClick={() => dispatch(logout(navigate))}
        >
          Logout
        </Button>
      </Box>

      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={2} color="primary">
        Admin Dashboard
      </Typography>

      {/* Task Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1976d2" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Username
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Task
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Image
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.length > 0 ? (
                  todos.map((todo) => (
                    <TableRow key={todo._id} hover>
                      <TableCell>{todo.username || "Unknown"}</TableCell>
                      <TableCell>{todo.task}</TableCell>
                      <TableCell>
                        {todo.image ? (
                          <IconButton
                            color="primary"
                            onClick={() =>
                              setSelectedImage(
                                `http://localhost:5000${todo.image}`
                              )
                            }
                          >
                            <Image />
                          </IconButton>
                        ) : (
                          "No Image"
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No tasks available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Pagination */}
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(totalResults / 10)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* Image Preview Modal */}
      <Modal
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            p: 3,
            borderRadius: 2,
            textAlign: "center",
            boxShadow: 24,
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Task Preview"
              style={{ maxWidth: "100%" }}
            />
          )}
          <Box mt={2}>
            <Button
              variant="contained"
              color="error"
              startIcon={<Close />}
              onClick={() => setSelectedImage(null)}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
