import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

export const db = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false
 });
        console.log("Database connected successfully.");
        return db
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1);
    }
}