const express = require("express");

const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require("../controllers/authController");
const {authMiddleware} = require("../middleware/authMiddleware");

const router = express.Router();

// Register route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, getCurrentUser);
router.get("/my-resumes",authMiddleware);

module.exports = router;