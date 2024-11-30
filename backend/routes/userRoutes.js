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
} from "../controllers/userController.js";
import { authenticate, autorizedAdmin } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, autorizedAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateUserProfile);
router
  .route("/:id")
  .delete(authenticate, autorizedAdmin, deleteUserById)
  .get(authenticate, autorizedAdmin, getUserById)
  .put(authenticate, autorizedAdmin, updateUserById);

export default router;
