import mongoose from "mongoose";
import dns from "node:dns/promises"

export const connectDB = async () => {
  try {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("DB Error details:", err.message);
    throw err;
  }
};