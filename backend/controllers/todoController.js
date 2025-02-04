import todoModel from "../models/TodoModel.js";


export const createTodo = async (req, res) => {
    const { task,  } = req.body;
    console.log("Task: ",req.body)
    try {
      const imagePath = req.file ? `uploads/${req.file.filename}` : null;
      const newTodo = new todoModel({
        userId: req.user.id,
        task,
        image: imagePath
      });
      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


export const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task, isCompleted } = req.body;
  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { task, isCompleted },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await todoModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};