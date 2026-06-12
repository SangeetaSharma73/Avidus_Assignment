const express = require("express");
const {
  registerValidation,
  loginValidation,
  validate,
} = require("../../validators/auth.validator");

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Login Success
 */
const { register, login } = require("../controllers/auth.controller");

router.post("/register", registerValidation, validate, register);

router.post("/login", loginValidation, validate, login);

module.exports = router;
