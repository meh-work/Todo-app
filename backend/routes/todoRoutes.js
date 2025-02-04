import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todoController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import imageUploader from "../controllers/imageUploader.js";

const router = express.Router();

router.post('/', authMiddleware, imageUploader.single("image"), createTodo);
router.get('/', authMiddleware, getTodos);
router.put('/:id', authMiddleware, updateTodo);
router.delete('/:id', authMiddleware, deleteTodo);

export default router;