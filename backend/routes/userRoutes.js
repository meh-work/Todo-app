import express from "express";
import {
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
router.post(
  "/user-profile",
  profileImageUploader.single("image"),
  updateUserProfile
);

export default router;
