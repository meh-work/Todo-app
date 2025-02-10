import todoModel from "../models/TodoModel.js";
import userModel from "../models/UserModel.js"


export const createTodo = async (req, res) => {
    const { task  } = req.body;
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

export const getTodosForAdmin = async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      // Fetch Todos using populate: 
      const todos = await todoModel
          .find({ task: { $ne: "undefined" } })
          .populate('userId')
          .skip(skip)
          .limit(Number(limit));

      // Fetch Todos using aggregation: 
      // const todos = await todoModel.aggregate([
      //   {
      //     $lookup: {
      //       from: 'users',
      //       localField: 'userId',
      //       foreignField: '_id',
      //       as: 'userDetails'
      //     }
      //   }
      // ])

      // console.log("Todos: ",todos)
      const total = await todoModel.countDocuments({ task: { $ne: "undefined" } });
      const formattedTodos = todos.map(todo => ({
          _id: todo._id,
          username: todo.userId.username || "Unknown",
          task: todo.task,
          image: todo.image || null,
          isDeleted: todo.isDeleted,
          isCompleted: todo.isDeleted
      }));

      res.status(200).json({ todos: formattedTodos, total });
  } catch (error) {
    console.log(error);
    
      res.status(500).json({ error: error.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.find({ userId: req.user.id, isDeleted: false });
    res.status(200).json({todos});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task, isCompleted } = req.body;
  try {
    const imagePath = req.file ? `uploads/${req.file.filename}` : null;
    const updateData = { task, isCompleted };
    
    if (imagePath) {
      updateData.image = imagePath;
    }

    const updatedTodo = await todoModel.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTodo = await todoModel.findByIdAndUpdate(
      id,
      {isDeleted: true},
      {new: true}
    )
    res.status(200).json(deleteTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};