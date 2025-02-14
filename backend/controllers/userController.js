import { userLogin, userRegister } from "../services/auth/auth.js";

export const register = async (req, res) => {
  const { username, password } = req.body;
  const result = await userRegister(username, password);

  if (result.error){
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json({ message: result.message, token: result.token })
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const result = await userLogin(username, password);
  
  if (result.error){
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json({ message: result.message, data: result })
};

