import User from "../models/user.js";
import createToken from "../utils/createToken.js";
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }

  const userExists = await User.findOne({ email });
  if (userExists)
    res.status(400).json({ message: "User already exists", success: false });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid user data", success: false });
    throw new Error("Invalid user data");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
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
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      success: true,
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
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        success: true,
      });
    } else {
      res.status(401).json({ message: "user not found", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting user profile", success: false });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      if (name) {
        user.name = name || user.name;
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
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        success: true,
      });
    } else {
      res.status(401).json({ message: "user not found", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user profile", success: false });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting users", success: false });
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
  const { name, email, isAdmin } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (user.isAdmin) {
      return res
        .status(401)
        .json({ message: "you can't update admin user", success: false });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: "user not found", success: false });
    }
    if (name) {
      user.name = name || user.name;
    }
    if (email) {
      user.email = email || user.email;
    }
    if (isAdmin) {
      user.isAdmin = Boolean(isAdmin) || user.isAdmin;
    }

    await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", success: false });
  }
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
