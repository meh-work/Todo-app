import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = new mongoose.Schema({
  adminname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {type: String, required: true, default: "Admin"},
  token: {type: String, default: ""}
});

AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('Admin', AdminSchema);
