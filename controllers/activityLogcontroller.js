
import ActivityLog from "../models/activityLog.js";


export const createLog = async (userId, action, entityType, entityId, description = "") => {
  try {
    const log = new ActivityLog({
      user: userId,
      action,
      entityType,
      entityId,
      description,
    });
    await log.save();
    return log;
  } catch (err) {
    console.error("Error creating log:", err);
  }
};

// ✅ Get all logs (Admin or Manager might need this)
export const getLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user", "name email") // show user info
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching logs" });
  }
};

// ✅ Get logs for a specific entity (e.g., project or task)
export const getLogsByEntity = async (req, res) => {
  try {
    const { entityType, entityId } = req.params;
    const logs = await ActivityLog.find({ entityType, entityId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching entity logs" });
  }
};
