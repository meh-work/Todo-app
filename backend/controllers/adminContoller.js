import { adminLogin, adminLogout } from "../services/auth/auth.js";

export const login = async (req, res) => {
  const { adminname, password } = req.body;
  const result = await adminLogin(adminname, password);
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json({ message: result.message, data: result });
};

export const logout = async (req,res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  const result = await adminLogout(token);
  
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.status(result.status).json({ message: result.message, data: result })
}