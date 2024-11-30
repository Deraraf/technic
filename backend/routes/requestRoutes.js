import express from "express";

const router = express.Router();

import {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequestById,
  deleteRequestById,
} from "../controllers/requestController.js";
import { authenticate, autorizedAdmin } from "../middlewares/auth.js";

router
  .route("/")
  .post(authenticate, createRequest)
  .get(authenticate, autorizedAdmin, getAllRequests);

router
  .route("/:id")
  .put(authenticate, autorizedAdmin, updateRequestById)
  .delete(authenticate, autorizedAdmin, deleteRequestById)
  .get(authenticate, autorizedAdmin, getRequestById);

export default router;
