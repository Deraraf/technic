import express from "express";
import {
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
  verifyEmail,
} from "../controllers/userController.js";
import { authenticate, autorizedAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(createUser).get(getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.route("/reset-password/:id/:token").post(resetPassword);
router.get("/verify-email/:id/:token", verifyEmail);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateUserProfile);
router
  .route("/:id")
  .delete(authenticate, autorizedAdmin, deleteUserById)
  .get(authenticate, autorizedAdmin, getUserById)
  .put(authenticate, autorizedAdmin, updateUserById);
router.get("/total-users", totalUsers);

export default router;
