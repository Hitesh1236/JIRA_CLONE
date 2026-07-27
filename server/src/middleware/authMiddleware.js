import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import AppError from "../services/AppError.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Not authorized", 401);
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.userId).select("-password");

  if (!req.user) {
    throw new AppError("Invalid Token", 401);
  }

  next();
};
