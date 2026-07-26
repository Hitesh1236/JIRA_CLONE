import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      tls: true,
      serverSelectionTimeoutMS: 5000, // Don't hang for 30s
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("DB Error details:", err.message);
    throw err;
  }
};