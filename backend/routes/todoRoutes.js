import {
  assignTask,
  createTodo,
  deleteTodo,
  getTodos,
  getTodosForAdmin,
  updateTodo,
} from "../controllers/todoController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { imageUploader } from "../controllers/imageUploader.js";
import imageChange from "../controllers/imageChange.js";

const router = express.Router();

router.post("/", authMiddleware, imageUploader.single("image"), createTodo);
router.get("/", authMiddleware, getTodos);
router.get("/admin", authMiddleware, getTodosForAdmin);
router.post("/assign-task", authMiddleware, assignTask);
router.put("/:id", authMiddleware, imageChange.single("image"), updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
