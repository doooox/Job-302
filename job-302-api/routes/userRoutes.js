import express from "express";
import {
  getAllUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  editUserProfile,
} from "../controllers/user/userController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.get("/", getAllUser);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", protectedRoute, logoutUser);
userRoutes.get("/profile", protectedRoute, getUserProfile);
userRoutes.put("/profile", protectedRoute, editUserProfile);

export default userRoutes;
