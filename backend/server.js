import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
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
app.use('/api/admin',adminRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running on ${PORT}`);
        
    })
})    
.catch((err)=>{
    console.log(err)
})
