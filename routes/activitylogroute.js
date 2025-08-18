// routes/activityLogRoutes.js
import express from "express";
import { getLogs, getLogsByEntity } from "../controllers/activitylogcontroller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Admin/Manager can view all logs
router.get("/", authMiddleware, getLogs);

// Get logs for a specific entity (project/task/team)
router.get("/:entityType/:entityId", authMiddleware, getLogsByEntity);

export default router;
