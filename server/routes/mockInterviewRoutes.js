
const express = require("express");

const {
    generateInterview,
} = require(
    "../controllers/mockInterviewController"
);

const {
    authMiddleware,
} = require(
    "../middleware/authMiddleware"
);

const router = express.Router();

router.post(
  "/generate",
  authMiddleware,
  generateInterview
);

module.exports = router;


// const express = require("express");

// const {generateInterview,} = require("../controllers/mockInterviewController");

// const router = express.Router();

// router.post("/generate",generateInterview);
// const {
//   authMiddleware,
// } = require(
//   "../middleware/authMiddleware"
// );

// router.post(
//   "/generate/:resumeId",
//   authMiddleware,
//   generateInterview
// );

// module.exports = router;