import User from "../../models/users/userModel.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../../utils/helpers.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const emailTaken = await User.exists({ email });
    const usernameTaken = await User.exists({ username });

    if (emailTaken)
      return res.status(400).json({
        message: "Entered email is already taken",
      });

    if (usernameTaken)
      return res.status(400).json({
        message: "Entered username is already taken",
      });

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    if (password !== confirmPassword)
      return res.status(400).json({
        message: "Passwords don't match",
      });

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    if (user) {
      generateToken(res, user._id);
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    }
    return res.status(400).json({
      message: "Invalid user data",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(401).json({ message: "Enter email or password" });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    const matchPasswords = await bcryptjs.compare(password, user.password);

    if (matchPasswords) {
      generateToken(res, user._id);
      return res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    }
    return res.status(401).json({ message: "Invalid username or password" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const editUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { username, email } = req.body;

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
  }

  const updatedUser = await user.save();
  if (updatedUser)
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
    });

  return res.status(404).json("User not found");
};
