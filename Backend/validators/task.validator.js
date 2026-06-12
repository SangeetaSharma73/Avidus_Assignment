// src/validators/task.validator.js

const { body, validationResult } = require("express-validator");

exports.taskValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("description").optional().isString(),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};
