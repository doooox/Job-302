import jwt from "jsonwebtoken";
import User from "../models/users/userModel.js";

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const protectedRoute = authenticateUser;

export const adminRoute = async (req, res, next) => {
  await authenticateUser(req, res, async () => {
    const { user } = req;
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "You don't have permission to use this route." });
    }
    next();
  });
};

export const companiesRoute = async (req, res, next) => {
  await authenticateUser(req, res, async () => {
    const { user } = req;
    if (user.role !== "company" && user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "You don't have permission to use this route." });
    }
    next();
  });
};
