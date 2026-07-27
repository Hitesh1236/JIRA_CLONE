import mongoose from "mongoose";
import dns from "node:dns/promises";

export const connectDB = async () => {
  try {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);

    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("========== MONGO ERROR ==========");
    console.error("NAME:", err.name);
    console.error("MESSAGE:", err.message);
    console.error("CAUSE:", err.cause);
    console.error("REASON:", err.reason);
    
    if (err.reason?.servers) {
      for (const [host, info] of err.reason.servers) {
        console.error("SERVER:", host);
        console.error("TYPE:", info.type);
        console.error("ERROR:", info.error);
      }
    }

    console.error("=================================");
    throw err;
  }
};