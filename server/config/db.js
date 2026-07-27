import mongoose from "mongoose";
import dns from "node:dns/promises"

export const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("DB Error:", err);
    throw err;
  }
};