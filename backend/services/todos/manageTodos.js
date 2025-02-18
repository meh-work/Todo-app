import TodoModel from "../../models/TodoModel.js";

export const addTodos = async (imagePath, userId, task) => {
  console.log("todo  img: ", imagePath);
  try {
    const newTodo = new TodoModel({
      userId: userId,
      task,
      image: imagePath,
    });
    await newTodo.save();
    return { newTodo, status: 201 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
};

export const editTodos = async (id, task, isCompleted, imagePath, userId) => {
  const updateData = { task, isCompleted };
  try {
    if (imagePath) {
      updateData.image = imagePath;
    }
    const todo = await TodoModel.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    const previousTask = todo.task;
    // Update task
    todo.task = task;
    todo.isCompleted = isCompleted;
    todo.image = imagePath;
    // Add to todoLogs
    todo.todoLogs.push({
      assignedTo: todo.userId,
      assignedBy: todo.assignedBy || userId, // If previously assigned, keep it
      taskBefore: previousTask,
      taskAfter: task,
      changedAt: new Date(),
    });
    await todo.save();

    return { message: "Todo updated successfully.", status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
};

export const fetchUserTodos = async (userId) => {
  try {
    const todos = await TodoModel.find({ userId: userId, isDeleted: false })
      .populate("assignedBy", "name email")
      .populate("todoLogs.assignedBy", "name")
      .populate("todoLogs.assignedTo", "name");
    if (!todos.length === 0) return { error: "Todos not found.", status: 200 };

    return { todos, status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
};

export const removeTodos = async (id) => {
  try {
    const deleteTodo = await TodoModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    return { deleteTodo, status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
};
