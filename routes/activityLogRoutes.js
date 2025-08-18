import express from "express";
import { getLogs, getLogsByEntity } from "../controllers/activityLogcontroller.js";
import { auth, authorizeRoles } from "../middleware/authmiddleware.js";

const router = express.Router();

// Admin/Manager can view all logs
router.get("/", auth, authorizeRoles("Admin", "ProjectManager"), getLogs);

// Get logs for a specific entity (project/task/team)
router.get("/:entityType/:entityId", auth, getLogsByEntity);

export default router;
