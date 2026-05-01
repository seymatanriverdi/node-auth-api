const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getProfile, getUsers } = require("../controllers/userController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.get("/users", authMiddleware, roleMiddleware("admin"), getUsers);


module.exports = router;