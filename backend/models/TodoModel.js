import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  image: { type: String },
  isDeleted: {type: Boolean, default: false}
});

export default mongoose.model('Todo', TodoSchema);
