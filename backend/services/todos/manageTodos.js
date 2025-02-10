import TodoModel from "../../models/TodoModel.js";

export const addTodos = async (imagePath,userId, task) => {
    try {
      
        const newTodo = new TodoModel({
          userId: userId,
          task,
          image: imagePath
        });
        await newTodo.save();
        return {newTodo, status: 201}
      } catch (error) {
        return { error: error.message, status: 500}
      }
}

export const editTodos = async (id,task,isCompleted,imagePath) => {
    const updateData = { task, isCompleted };
    try {
      if (imagePath) {
        updateData.image = imagePath;
      }
      const updatedTodo = await TodoModel.findByIdAndUpdate(id, updateData, { new: true });
      return { updatedTodo, status: 200}
    } catch (error) {
        console.log(error)
      return { error: error.message, status: 500}
    }
}

export const fetchUserTodos = async(userId) => {
    try {
        const todos = await TodoModel.find({ userId: userId, isDeleted: false });
        if (!todos.length === 0) return { error: "Todos not found.", status: 200};

        return { todos, status: 200}
      } catch (error) {
        return { error: error.message, status: 500 };
      }
}

export const removeTodos = async (id) => {
    try {
      const deleteTodo = await TodoModel.findByIdAndUpdate(
        id,
        {isDeleted: true},
        {new: true}
      )
      return { deleteTodo, status: 200}
    } catch (error) {
        return { error: error.message, status: 500}
    }
}