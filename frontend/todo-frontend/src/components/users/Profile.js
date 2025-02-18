import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Avatar,
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import {
  fetchUserProfile,
  userDashboardFrontendRoute,
} from "../../routes/routes";
import "../../styles/Profile.css";

const Profile = () => {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchUserProfile(token);
        setUser(res.data.user);
        setName(res.data.user.name);
        setEmail(res.data.user.email);

        if (res.data.user.image) {
          setImagePreview(`http://localhost:5000/${res.data.user.image}`);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchUser();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (image) formData.append("image", image);

      const res = await axios.post(
        "http://localhost:5000/api/users/user-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile updated successfully!");
      setUser(res.data.user);
      setImagePreview(`http://localhost:5000/${res.data.imagePath}`);
      setIsEditing(false);
      navigate(userDashboardFrontendRoute);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ padding: 3, backgroundColor: "#f5f5f5", borderRadius: 3 }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ marginBottom: 2 }}
      >
        ⬅ Back
      </Button>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#2c3e50" }}
      >
        Profile
      </Typography>
      {user ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              marginBottom: 2,
              border: "3px solid #3498db",
            }}
            src={imagePreview || "/default-avatar.png"}
            alt="Profile"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: "16px" }}
            />
          )}
          {isEditing ? (
            <>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleUpdateProfile}
                sx={{
                  padding: "12px",
                  fontWeight: "bold",
                  backgroundColor: "#3498db",
                }}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Name:</strong> {user.name}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setIsEditing(true)}
                sx={{ marginTop: 2, borderColor: "#3498db", color: "#3498db" }}
              >
                Edit Profile
              </Button>
            </>
          )}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ color: "#888", marginTop: 3 }}>
          Loading profile...
        </Typography>
      )}
    </Container>
  );
};

export default Profile;
