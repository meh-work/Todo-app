import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/userActions/userAuthActions";
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

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
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
            User Login
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
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
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

          {/* Redirect Links */}
          <Typography variant="body2" color="textSecondary" mt={2}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register here
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={1}>
            Admin login?{" "}
            <Link
              to="/admin-login"
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

export default Login;
