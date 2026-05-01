const express = require("express");

const validate = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../validations/authValidation");
const { register, login, refreshToken,logout } = require("../controllers/authController");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

module.exports = router;