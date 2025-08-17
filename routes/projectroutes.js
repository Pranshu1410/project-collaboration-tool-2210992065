import express from "express";
import { auth, authorizeRoles } from "../middleware/authmiddleware.js";
import {
  createProject,
  getTeamProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectcontroller.js";

const router = express.Router();

// Create project (only Admin/project-manager)
router.post(
  "/create",
  auth,
  authorizeRoles("Admin", "ProjectManager"),
  createProject
);

// Get projects of a team (all team members)
router.get("/:teamId", auth, getTeamProjects);

// Update project (only Admin/project-manager)
router.put(
  "/:projectId",
  auth,
  authorizeRoles("Admin", "ProjectManager"),
  updateProject
);

// Delete project (only Admin/project-manager)
router.delete(
  "/:projectId",
  auth,
  authorizeRoles("Admin", "ProjectManager"),
  deleteProject
);

export default router;
