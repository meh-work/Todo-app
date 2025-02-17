import todoModel from "../models/TodoModel.js";
import {
  addTodos,
  editTodos,
  fetchUserTodos,
  removeTodos,
} from "../services/todos/manageTodos.js";

export const createTodo = async (req, res) => {
  const { task } = req.body;
  const imagePath = req.file ? `uploads/${req.file.filename}` : null;
  const userId = req.user.id;
  const result = await addTodos(imagePath, userId, task);
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.status(result.status).json({ error: result.error });
};

export const getTodosForAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    // Fetch Todos using populate:
    const todos = await todoModel
      .find({ task: { $ne: "undefined" } })
      .populate("userId")
      .skip(skip)
      .limit(Number(limit));

    const total = await todoModel.countDocuments({
      task: { $ne: "undefined" },
    });
    const formattedTodos = todos.map((todo) => ({
      _id: todo._id,
      username: todo.userId.username || "Unknown",
      task: todo.task,
      image: todo.image || null,
      isDeleted: todo.isDeleted,
      isCompleted: todo.isDeleted,
    }));

    res.status(200).json({ todos: formattedTodos, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTodos = async (req, res) => {
  const userId = req.user.id;
  const result = await fetchUserTodos(userId);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.status(result.status).json({ todos: result.todos });
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task, isCompleted } = req.body;
  const imagePath = req.file ? `uploads/${req.file.filename}` : null;
  const result = await editTodos(id, task, isCompleted, imagePath);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.status(result.status).json({ message: result.message });
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  const result = await removeTodos(id);
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.status(result.status).json({ message: result.error });
};
