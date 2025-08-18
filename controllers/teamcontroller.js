import Team from "../models/Team.js";
import User from "../models/User.js";
import { createLog } from "./activityLogcontroller.js";

// Create new team
export const createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const team = new Team({
      name,
      createdBy: userId,
      members: [userId], 
    });

    await team.save();

    // Log activity
    await createLog(
      userId,
      "Create Team",
      "Team",
      team._id,
      `${req.user.name} created team "${team.name}"`
    );

    res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    res.status(500).json({ message: "Error creating team", error: error.message });
  }
};

export const joinTeam = async (req, res) => {
  try {
    const { teamId } = req.body;
    const userId = req.user.id;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (!team.members.includes(userId)) {
      team.members.push(userId);
      await team.save();

      // Log activity
      await createLog(
        userId,
        "Join Team",
        "Team",
        team._id,
        `${req.user.name} joined team "${team.name}"`
      );
    }

    res.status(200).json({ message: "Joined team successfully", team });
  } catch (error) {
    res.status(500).json({ message: "Error joining team", error: error.message });
  }
};

export const getUserTeams = async (req, res) => {
  try {
    const userId = req.user.id;

    const teams = await Team.find({ members: userId }).populate("members", "name email role");
    res.status(200).json({ teams });
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error: error.message });
  }
};
