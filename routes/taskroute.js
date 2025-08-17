import express from "express";
import { auth } from "../middleware/authmiddleware.js";
import {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../controllers/taskcontroller.js";

const router = express.Router();

router.post("/create", auth, createTask); 
router.get("/:projectId", auth, getProjectTasks); 
router.put("/:taskId", auth, updateTask); 
router.delete("/:taskId", auth, deleteTask); 
router.patch("/:taskId/status", auth, updateTaskStatus);

export default router;
