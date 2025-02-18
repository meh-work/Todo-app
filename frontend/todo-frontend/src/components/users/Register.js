import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/userActions/registerAction";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Grid,
  Paper,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(formData, navigate));
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ display: "flex", justifyContent: "center", paddingTop: 5 }}
    >
      <Paper
        sx={{
          padding: 3,
          width: "100%",
          borderRadius: 2,
          backgroundColor: "#fafafa",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            marginBottom: 2,
            fontWeight: "bold",
            color: "#2c3e50",
          }}
        >
          Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              fullWidth
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              fullWidth
              type="password"
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                marginTop: 2,
                padding: "12px",
                fontWeight: "bold",
                backgroundColor: "#3498db",
                "&:hover": {
                  backgroundColor: "#2980b9",
                },
              }}
            >
              Register
            </Button>
          </Box>
        </form>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
            Already have an account?{" "}
            <Link
              to="/"
              style={{
                color: "#3498db",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
