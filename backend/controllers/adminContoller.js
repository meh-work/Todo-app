import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/AdminModel.js"

export const register = async (req, res) => {
  const { adminname, password } = req.body;
  try {
    const existingUser = await Admin.findOne({ adminname });
    if (existingUser) return res.status(400).json({ message: "Admin already exists" });

    const newUser = new Admin({ adminname, password });
    await newUser.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { adminname, password } = req.body;
  try {
    const user = await Admin.findOne({ adminname });
    if (!user) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

