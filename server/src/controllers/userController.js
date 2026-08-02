import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import generateToken from "../utility/generateToken.js";
import bcrypt from "bcryptjs";
import AppError from "../services/AppError.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Password is wrong", 401);
  }
  const token = generateToken(user._id);
  return res.status(200).json({
    message: "Login successful",
    name: user.name,
    email: user.email,
    token,
  });
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new AppError("Please enter complete details",400)
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("User already exists",409)
    }
    const hashedPass = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPass,
    });
    return res.status(201).json({ message: "User created successfully" });
};
