import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../redux/actions/adminActions/authActions";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { LockOpen } from "@mui/icons-material";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ adminname: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          p: 4,
          boxShadow: 3,
          borderRadius: 3,
          textAlign: "center",
          bgcolor: "#f4f6f8",
        }}
      >
        <CardContent>
          {/* Heading */}
          <Typography variant="h4" color="primary" fontWeight="bold" mb={2}>
            Admin Login
          </Typography>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={formData.adminname}
              onChange={(e) =>
                setFormData({ ...formData, adminname: e.target.value })
              }
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<LockOpen />}
            >
              Login
            </Button>
          </Box>

          {/* Redirect Link */}
          <Typography variant="body2" color="textSecondary" mt={2}>
            Not an admin?{" "}
            <Link
              to="/"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminLogin;
