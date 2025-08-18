import Task from "../models/Task.js";
import Project from "../models/Project.js";
import Team from "../models/Team.js";
import { createLog } from "./activityLogcontroller.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo } = req.body;

    const project = await Project.findById(projectId).populate("team");
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!project.team.members.includes(req.user.id)) {
      return res.status(403).json({ message: "You are not a member of this project's team" });
    }

    if (assignedTo && assignedTo.some(u => !project.team.members.includes(u))) {
      return res.status(400).json({ message: "One or more assigned users are not in this team" });
    }

    const task = new Task({
      title,
      description,
      project: projectId,
      assignedTo,
      createdBy: req.user.id,
    });

    await task.save();

    // Log activity
    await createLog(
      req.user.id,
      "Create Task",
      "Task",
      task._id,
      `${req.user.name} created task "${task.title}" in project "${project.name}"`
    );

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error: error.message });
  }
};

export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).populate("team");
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!project.team.members.includes(req.user.id)) {
      return res.status(403).json({ message: "You are not a member of this team" });
    }

    const tasks = await Task.find({ project: projectId })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, assignedTo, status } = req.body;

    const task = await Task.findById(taskId).populate({
      path: "project",
      populate: { path: "team" },
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    // only task creator or Admin/PM of team can update
    if (
      task.createdBy.toString() !== req.user.id &&
      !["Admin", "ProjectManager"].includes(req.user.role)
    ) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (assignedTo) {
      if (assignedTo.some(u => !task.project.team.members.includes(u))) {
        return res.status(400).json({ message: "Invalid assigned user(s)" });
      }
      task.assignedTo = assignedTo;
    }
    if (status) task.status = status;

    await task.save();

    // Log activity
    await createLog(
      req.user.id,
      "Update Task",
      "Task",
      task._id,
      `${req.user.name} updated task "${task.title}"`
    );

    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId).populate({
      path: "project",
      populate: { path: "team" },
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    // only task creator or Admin/PM of team
    if (
      task.createdBy.toString() !== req.user.id &&
      !["Admin", "ProjectManager"].includes(req.user.role)
    ) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();

    // Log activity
    await createLog(
      req.user.id,
      "Delete Task",
      "Task",
      task._id,
      `${req.user.name} deleted task "${task.title}"`
    );

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // only assigned users can change status
    if (!task.assignedTo.includes(req.user.id)) {
      return res.status(403).json({ message: "You are not assigned to this task" });
    }

    task.status = status;
    await task.save();

    // Log activity
    await createLog(
      req.user.id,
      "Update Task Status",
      "Task",
      task._id,
      `${req.user.name} changed status of task "${task.title}" to "${status}"`
    );

    res.status(200).json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};
