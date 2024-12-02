import User from "../models/user.js";
import createToken from "../utils/createToken.js";
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all the inputs." });
  }

  const userExists = await User.findOne({ email });
  if (userExists)
    return res
      .status(400)
      .json({ message: "User already exists", success: false });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid user data", success: false });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all the inputs", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Incorrect password", success: false });
    }

    createToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      success: true,
      message: "logined successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", success: false });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully", success: true });
};

const getCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        success: true,
      });
    } else {
      return res
        .status(401)
        .json({ message: "user not found", success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting user profile", success: false });
  }
};
const updateUserProfile = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      if (username) {
        user.username = username || user.username;
      }
      if (email) {
        user.email = email || user.email;
      }
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword || user.password;
      }
      await user.save();
      return res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        success: true,
      });
    } else {
      return res
        .status(401)
        .json({ message: "user not found", success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating user profile", success: false });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting users", success: false, errors: error });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.isAdmin) {
      return res
        .status(401)
        .json({ message: "you can't delete admin user", success: false });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: "user not found", success: false });
    }
    if (user) {
      await User.deleteOne({ _id: req.user._id });
      res.status(200).json({ user: user, success: true });
    } else {
      res.status(401).json({ message: "user not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", success: false });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json({ user: user, success: true });
    } else {
      res.status(401).json({ message: "user not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting user", success: false });
  }
};

const updateUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  const { username, email, isAdmin } = req.body;

  if (user) {
    if (username) {
      user.username = username || user.username;
    }
    if (email) {
      user.email = email || user.email;
    }
    if (isAdmin) {
      user.isAdmin = Boolean(isAdmin) || user.isAdmin;
    }

    const updatedUser = await user.save();

    return res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }

  return res.status(404).json({ message: "User not found" });
};

export {
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
  updateUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
