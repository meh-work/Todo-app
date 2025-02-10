import { adminLogin } from "../services/auth/auth.js";

export const login = async (req, res) => {
  const { adminname, password } = req.body;
  const result = await adminLogin(adminname, password);
  console.log("Login result: ",result);
  
  
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json({ message: result.message, token: result.token });
};

