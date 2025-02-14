import express from "express";
import { login, logout, register } from "../controllers/userController.js";

const router = express.Router();

router.use(express.json());

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
