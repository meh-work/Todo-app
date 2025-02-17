import {
  getAllUserProfiles,
  getUserProfile,
  updateUserData,
  userLogin,
  userLogout,
  userRegister,
} from "../services/auth/auth.js";

export const register = async (req, res) => {
  const { username, password, name, email, image } = req.body;
  const result = await userRegister(username, password, name, email, image);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res
    .status(result.status)
    .json({ message: result.message, token: result.token });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const result = await userLogin(username, password);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json({ message: result.message, data: result });
};

export const logout = async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  const result = await userLogout(token);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.status(result.status).json({ message: result.message, data: result });
};

export const getUser = async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log("Get Users token: ", token);

  const result = await getUserProfile(token);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.status(result.status).json({ message: result.message, data: result });
};

export const getAllUsers = async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const result = await getAllUserProfiles(token);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.status(result.status).json({ message: result.message, data: result });
};

export const updateUserProfile = async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log("Get Users token: ", token);
  const { name, email } = req.body;
  const imagePath = req.file ? `uploads/profile/${req.file.filename}` : null;

  console.log("imgPath: ", req.file);
  console.log("Update user data: ", req.body);

  const result = await updateUserData(token, { name, email }, imagePath);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.status(result.status).json({
    message: result.message,
    data: { result, imagePath },
  });
};
