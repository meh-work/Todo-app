import multer from "multer";
import path from "path";

// Set storage engine
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});
const profileStorage = multer.diskStorage({
  destination: "./uploads/profile",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

export const imageUploader = multer({ storage });
export const profileImageUploader = multer({ storage: profileStorage });
