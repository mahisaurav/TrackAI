const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  getProgress,
  upsertProgress,
  getStats,
  updateStats,
} = require("../controllers/dsaController");

const router = express.Router();

router.get("/progress", authMiddleware, getProgress);
router.put("/progress/:questionKey", authMiddleware, upsertProgress);
router.get("/stats", authMiddleware, getStats);
router.put("/stats", authMiddleware, updateStats);

module.exports = router;
