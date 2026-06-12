// src/validators/auth.validator.js

const { body, validationResult } = require("express-validator");

exports.registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Valid email required"),

  body("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must be at least 6 chars"),
];

exports.loginValidation = [
  body("email").isEmail(),

  body("password").notEmpty(),
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
