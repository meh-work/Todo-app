import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";


dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

import userRoutes from "./routes/userRoutes.js"
app.use('/api/users',userRoutes);
import todoRoutes from "./routes/todoRoutes.js"
app.use('/api/todos',todoRoutes);
import adminRoutes from "./routes/adminRoutes.js"
import { db } from "./db/db.js";
app.use('/api/admin',adminRoutes);

const PORT = process.env.PORT || 5000;

db().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error("Failed to start server:", err);
  });