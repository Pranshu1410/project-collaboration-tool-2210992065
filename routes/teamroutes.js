import express from "express";
import { createTeam, joinTeam, getUserTeams } from "../controllers/teamcontroller.js";
import {auth} from "../middleware/authmiddleware.js";
import { authorizeRoles} from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/create", auth, authorizeRoles("Admin", "ProjectManager"), createTeam);

router.post("/join", auth, joinTeam);

router.get("/my-teams", auth, getUserTeams);

export default router;
