import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./src/config/db.js";
import app from "./src/app.js";
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 3200;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

startServer();
