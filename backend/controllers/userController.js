import User from "../models/user.js";
import createToken from "../utils/createToken.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const createUser = async (req, res) => {
  const { username, lastName, email, password } = req.body;

  if (!username || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Invalid user data", success: false });
  }

  try {
    // Check if the email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format. Please check your email.",
        success: false,
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with isVerified: false
    const newUser = new User({
      username,
      lastName,
      email,
      password: hashedPassword,
      isVerified: false,
    });
    const savedUser = await newUser.save();

    // Generate a verification token
    const token = Jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const verificationLink = `https://technique-one.vercel.app/verify-email/${savedUser._id}/${token}`;

    // Send a verification email with CSS-styled button
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const emailTemplate = `
      <html>
        <head> 
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              text-align: center;
              padding: 20px;
              font-size: 24px;
            }
            .content {
              padding: 30px;
              text-align: center;
            }
              .content h1 {
              font-size: 24px;
              color: #4CAF50;
            }
            .content p {
              font-size: 16px;
              color: #666666;
            }
            .button {
              display: inline-block;
              margin: 30px 0;
              padding: 15px 30px;
              font-size: 18px;
              color: white;
              background-color: #4CAF50;
              text-decoration: none;
              border-radius: 5px;
            }
            .footer {
              margin-top: 40px;
              font-size: 14px;
              color: #FF0000;
            }
            .link {
              color: #4CAF50;
              word-wrap: break-word;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              Verify Your Email
            </div>
            <div class="content">
              <h1>Hello ${username},</h1>
              <p>Wellcome to Technic Maintainance Work Request Platform!</p>
              <p>Thank you for registering! Please verify your email to activate your account.</p>
              <a href="${verificationLink}" class="button">
                Verify Email
              </a>
              <p>If the button above doesn't work, paste this link into your browser:</p>
              <p>
                <a href="${verificationLink}" class="link">${verificationLink}</a>
              </p>
              <p class="footer">
                If you did not request this, please ignore this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.User,
      to: email,
      subject: "Verify your email",
      html: emailTemplate,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error sending verification email:", error);
        return res.status(500).json({
          message: "Error sending verification email",
          success: false,
        });
      } else {
        return res.status(201).json({
          _id: savedUser._id,
          username: savedUser.username,
          lastName: savedUser.lastName,
          email: savedUser.email,
          isAdmin: savedUser.isAdmin,
          message: "User registered successfully. Please verify your email.",
          success: true,
        });
      }
    });
    transporter.verify((error, success) => {
      if (error) {
        console.error("SMTP Connection Failed:", error);
      } else {
        console.log("SMTP Connection Successful:", success);
      }
    });
  } catch (error) {
    console.error("Error during user creation:", error);
    return res
      .status(500)
      .json({ message: "Error creating user", success: false });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { id, token } = req.params;
    const isCorrectToken = Jwt.verify(token, process.env.JWT_SECRET);

    if (!isCorrectToken) {
      return res
        .status(401)
        .json({ message: "Invalid or expired token", success: false });
    }

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Activate user if token is valid
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully. You can now log in.",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error verifying email", success: false });
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

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Email not verified", success: false });
    }

    createToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      success: true,
      message: "login successfull",
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
    const user = await User.findById(req.user._id).select("-password");

    if (user) {
      return res.status(200).json({
        _id: user._id,
        username: user.username,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
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
  const { username, lastName, email, password } = req.body;

  try {
    console.log("Updating user profile:", req.user._id, req.body);
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    let update = false;

    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res
          .status(400)
          .json({ message: "Username already taken", success: false });
      }
      console.log("Updating username");
      user.username = username;
      update = true;
    }

    if (lastName && lastName !== user.lastName) {
      user.lastName = lastName;
      update = true;
    }

    if (email && email !== user.email) {
      console.log("Updating email");
      user.email = email;
      update = true;
    }

    if (password) {
      if (password !== "") {
        console.log("Updating password");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        update = true;
      }
    }

    if (!update) {
      return res.status(200).json({
        message: "No changes were made",
        success: true,
      });
    }

    await user.save();

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      success: true,
    });
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    return res
      .status(500)
      .json({ message: "Error updating user profile", success: false });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting user", success: false, errors: error });
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

    await User.deleteOne({ _id: user._id });
    return res.status(200).json({ user: user, success: true });
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
  const { username, email, lastName, isAdmin } = req.body;

  if (user) {
    if (username) {
      user.username = username || user.username;
    }
    if (lastName) {
      user.lastName = lastName || user.lastName;
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
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }

  return res.status(404).json({ message: "User not found" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "user not found", success: false });
    }

    const token = Jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.User,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.User,
      to: email,
      subject: "Reset your password",
      text: `http://localhost:5173/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          message: "Error sending password reset link",
          success: false,
        });
      } else {
        return res.status(200).json({
          message: "Password reset link sent successfully",
          success: true,
        });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error sending password reset link", success: false });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    const isCorrectToken = Jwt.verify(token, process.env.JWT_SECRET);
    if (!isCorrectToken) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .json({ message: "Password updated successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error resetting password", success: false });
  }
};

const totalUsers = async (req, res) => {
  const totalUsers = await User.countDocuments({});
  res.json({ totalUsers });
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
  forgotPassword,
  resetPassword,
  totalUsers,
};
