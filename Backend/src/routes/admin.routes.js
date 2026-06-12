// src/routes/admin.routes.js

const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const authorizeRoles = require("../middleware/role.middleware");

const {
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getAllTasks,
  deleteAnyTask,
  getActivityLogs,
  getAnalytics,
} = require("../controllers/admin.controller");

router.use(protect);

router.use(authorizeRoles("Admin"));

/*
USERS
*/

router.get("/users", getAllUsers);

router.patch("/users/:userId/status", updateUserStatus);

router.delete("/users/:userId", deleteUser);

/*
TASKS
*/

router.get("/tasks", getAllTasks);

router.delete("/tasks/:taskId", deleteAnyTask);

/*
LOGS
*/

router.get("/logs", getActivityLogs);

/*
ANALYTICS
*/

router.get("/analytics", getAnalytics);

module.exports = router;
