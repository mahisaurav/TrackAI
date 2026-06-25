const applicationRoutes = require("./routes/applicationRoutes");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const mockInterviewRoutes = require("./routes/mockInterviewRoutes");
const dsaRoutes = require("./routes/dsaRoutes");
const dailyTaskRoutes = require("./routes/dailyTaskRoutes");
require("dotenv").config();

const clientUrl =
  process.env.CLIENT_URL ||
  (process.env.NODE_ENV !== "production" ? "http://localhost:5173" : "");

if (process.env.NODE_ENV === "production" && !process.env.CLIENT_URL) {
  console.warn(
    "CLIENT_URL is not set. CORS may block frontend requests in production.",
  );
}

app.use(
  cors({
    origin: clientUrl || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use("/applications", applicationRoutes);
app.use("/auth", authRoutes);
app.use("/api/resume",resumeRoutes);
app.use("/api/mock",mockInterviewRoutes);
app.use("/api/dsa", dsaRoutes);
app.use("/api/daily-tasks", dailyTaskRoutes);
app.use("/api/tasks", dailyTaskRoutes);

// Test Route
app.get("/test", (req, res) => {
  res.json({
    message: "Server is working",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});