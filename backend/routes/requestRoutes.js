import express from "express";

const router = express.Router();

import {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequestById,
  deleteRequestById,
  getRecentRequests,
  markRequestSeenById,
  getEquipment,
  getUserRequests,
} from "../controllers/requestController.js";
import { authenticate, autorizedAdmin } from "../middlewares/auth.js";

router
  .route("/")
  .post(authenticate, createRequest)
  .get(authenticate, autorizedAdmin, getAllRequests);

// Protected route to get user-specific requests
router.route("/user-requests").get(authenticate, getUserRequests);

router.route("/recent-requests").get(authenticate, getRecentRequests);
router
  .route("/:id/mark-seen")
  .put(authenticate, autorizedAdmin, markRequestSeenById);
router
  .route("/:id")
  .put(authenticate, updateRequestById)
  .delete(authenticate, autorizedAdmin, deleteRequestById)
  .get(authenticate, autorizedAdmin, getRequestById);
router
  .route("/equipment/:typeOfRequest")
  .get(authenticate, autorizedAdmin, getEquipment);

export default router;
