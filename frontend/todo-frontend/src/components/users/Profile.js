import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/Profile.css";
import {
  fetchUserProfile,
  userDashboardFrontendRoute,
} from "../../routes/routes";

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
        console.log("User profile data: ", res.data);

        setUser(res.data.user);
        setName(res.data.user.name);
        setEmail(res.data.user.email);

        // Set image preview from API response if it exists
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

      console.log("Update of formdata: ", formData);

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

      console.log("Updated image result: ", res.data);

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
    <div className="profile-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <h2>Profile</h2>
      {user ? (
        <div className="profile-content">
          <img
            src={imagePreview || "/default-avatar.png"}
            alt="Profile"
            className="profile-pic"
          />
          {isEditing && (
            <input type="file" accept="image/*" onChange={handleImageChange} />
          )}

          {isEditing ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <button onClick={handleUpdateProfile}>Save Changes</button>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
