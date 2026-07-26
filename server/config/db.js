import mongoose from "mongoose";
export const connectDB = async () => {
  console.log("MONGO_URI is set:", !!process.env.MONGO_URL);
  await mongoose.connect(process.env.MONGO_URL);
};
