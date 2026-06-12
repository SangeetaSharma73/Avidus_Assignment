const express = require("express");

const router = express.Router();
const validateTask = require("../middleware/validate");
const protect = require("../middleware/auth.middleware");

const {
  createTask,
  getMyTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

router.use(protect);

router.post("/", validateTask, createTask);

router.get("/", getMyTasks);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
