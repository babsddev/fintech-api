import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const secretKey = process.env.JWT_KEY;
if (!secretKey) {
  throw new Error("JWT_KEY is not defined in the environment variables");
}

const generateJwt = (payload) => {
  return jwt.sign({ payload }, secretKey, { expiresIn: "30m" }); // Updated to expire in 30 minutes
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const passwordCompare = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email }); 
};

export { generateJwt, hashPassword, passwordCompare, verifyToken, findUserByEmail };
