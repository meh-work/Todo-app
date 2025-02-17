import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Added field
    todoLogs: [
      {
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        taskBefore: { type: String },
        taskAfter: { type: String },
        changedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Todo", TodoSchema);
