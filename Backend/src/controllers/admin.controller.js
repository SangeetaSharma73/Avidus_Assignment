// src/controllers/admin.controller.js

const User = require("../models/User");
const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");
const logActivity = require("../utils/activityLogger");

/*
GET ALL USERS
*/
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

/*
UPDATE USER STATUS
*/
exports.updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.status = status;

    await user.save();

    await logActivity(
      req.user._id,
      "USER_STATUS_UPDATED",
      `${user.email} status changed to ${status}`,
    );

    res.json({
      success: true,
      message: "User status updated",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/*
DELETE USER
*/
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "Admin") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete admin",
      });
    }

    await Task.deleteMany({
      createdBy: user._id,
    });

    await user.deleteOne();

    await logActivity(
      req.user._id,
      "USER_DELETED",
      `Deleted user ${user.email}`,
    );

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
GET ALL TASKS
*/
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

/*
DELETE ANY TASK
*/
exports.deleteAnyTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();

    await logActivity(
      req.user._id,
      "ADMIN_TASK_DELETED",
      `Deleted task ${task.title}`,
    );

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
GET ACTIVITY LOGS
*/
exports.getActivityLogs = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user", "name email role")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

/*
ANALYTICS
*/
exports.getAnalytics = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const pendingTasks = await Task.countDocuments({
      status: "Pending",
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalTasks,
        completedTasks,
        pendingTasks,
      },
    });
  } catch (error) {
    next(error);
  }
};
