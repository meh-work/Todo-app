import express from "express";
import {
  getAllUsers,
  getUser,
  login,
  logout,
  register,
  updateUserProfile,
} from "../controllers/userController.js";
import { profileImageUploader } from "../controllers/imageUploader.js";

const router = express.Router();

router.use(express.json());

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user-profile", getUser);
router.get("/all-users", getAllUsers);
router.post(
  "/user-profile",
  profileImageUploader.single("image"),
  updateUserProfile
);

export default router;
