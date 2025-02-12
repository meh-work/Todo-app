import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../../models/AdminModel.js"
import User from "../../models/UserModel.js"

export const adminLogin = async (adminname, password) => {
    try {
      const user = await Admin.findOne({ adminname });
      if (!user) return { error: "Admin not found", status: 404 };
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return { error: "Invalid credentials", status: 400 };
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      const updatedUser = await Admin.findByIdAndUpdate(user._id, {
        token
      }, {new: true})
      
      return { message: "Login successful", token, user: updatedUser, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
  };

  export const adminLogout = async (token) => {
    try {
      if (!token) {
        return { error: "No token provided", status: 401 };
      }
      const user = await Admin.findOne({ token });
      
      if (!user) return { error: "Admin not found", status: 404 };

      if(user.token !== ""){
        await Admin.findByIdAndUpdate(user._id, {
            token: ""
        })
        return { message : "Logout Successful", status: 200 };
      }
    } catch (error) {
      return { error: error.message, status: 500}
    }
  }

  export const userRegister = async (username, password) => {
    try {
      const existingUser = await User.findOne({ username });
      if(!existingUser) return { error: "User already exists.", status: 404}
  
      const newUser = new User({ username, password });
      await newUser.save();
      return { message: "Registration Successful.", token, status: 200 }
    } catch (error) {
      return { error: error.message, status: 500};
    }
}

export const userLogin = async (username, password) => {
  try {
      const user = await User.findOne({ username });
      if (!user) return { error: "User not found", status: 404 };
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return { error: "Invalid credentials", status: 400 };
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return ({ message: "Login successful", token, status: 200 });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}