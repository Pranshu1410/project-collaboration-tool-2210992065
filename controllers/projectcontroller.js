import Project from "../models/Project.js";
import Team from "../models/Team.js";
import { createLog } from "./activityLogcontroller.js";

export const createProject = async (req, res) => {
  try {
    const { name, description, teamId } = req.body;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    // check if user is in this team
    if (!team.members.includes(req.user.id)) {
      return res.status(403).json({ message: "You are not a member of this team" });
    }

    const project = new Project({
      name,
      description,
      team: teamId,
      createdBy: req.user.id,
    });

    await project.save();

    // Log activity
    await createLog(
      req.user.id,
      "Create Project",
      "Project",
      project._id,
      `${req.user.name} created project "${project.name}"`
    );

    res.status(201).json({ message: "Project created", project });
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error: error.message });
  }
};

export const getTeamProjects = async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (!team.members.includes(req.user.id)) {
      return res.status(403).json({ message: "You are not a member of this team" });
    }

    const projects = await Project.find({ team: teamId }).populate("createdBy", "name email");
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description } = req.body;

    const project = await Project.findById(projectId).populate("team");
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!project.team.members.includes(req.user.id)) {
      return res.status(403).json({ message: "You are not a member of this team" });
    }

    project.name = name || project.name;
    project.description = description || project.description;

    await project.save();

    // Log activity
    await createLog(
      req.user.id,
      "Update Project",
      "Project",
      project._id,
      `${req.user.name} updated project "${project.name}"`
    );

    res.status(200).json({ message: "Project updated", project });
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).populate("team");
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!project.team.members.includes(req.user.id)) {
      return res.status(403).json({ message: "You are not a member of this team" });
    }

    await project.deleteOne();

    // Log activity
    await createLog(
      req.user.id,
      "Delete Project",
      "Project",
      project._id,
      `${req.user.name} deleted project "${project.name}"`
    );

    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error: error.message });
  }
};
