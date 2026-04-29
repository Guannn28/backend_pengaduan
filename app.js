const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const env = require("./config/env");
const { distPath, uploadsPath } = require("./paths");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const allowedOrigins = new Set(env.CLIENT_ORIGINS);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} tidak diizinkan oleh CORS.`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(uploadsPath));
app.use("/api", authRoutes);
app.use("/api", complaintRoutes);
app.use(errorHandler);

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("/{*path}", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

module.exports = app;
