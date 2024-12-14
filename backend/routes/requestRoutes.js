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
} from "../controllers/requestController.js";
import { authenticate, autorizedAdmin } from "../middlewares/auth.js";

router
  .route("/")
  .post(authenticate, createRequest)
  .get(authenticate, autorizedAdmin, getAllRequests);

router
  .route("/recent-requests")
  .get(authenticate, autorizedAdmin, getRecentRequests);
router
  .route("/:id/mark-seen")
  .put(authenticate, autorizedAdmin, markRequestSeenById);
router
  .route("/:id")
  .put(authenticate, autorizedAdmin, updateRequestById)
  .delete(authenticate, autorizedAdmin, deleteRequestById)
  .get(authenticate, autorizedAdmin, getRequestById);
router
  .route("/equipment/:typeOfRequest")
  .get(authenticate, autorizedAdmin, getEquipment);

export default router;
