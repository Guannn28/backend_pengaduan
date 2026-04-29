require("dotenv").config();

const clientOrigins = String(
  process.env.CLIENT_ORIGIN || "http://localhost:5173"
)
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

module.exports = {
  PORT: Number(process.env.PORT) || 4000,
  CLIENT_ORIGIN: clientOrigins[0] || "http://localhost:5173",
  CLIENT_ORIGINS: clientOrigins,
  MONGODB_URI: process.env.MONGODB_URI || "",
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "complaints_db",
  ADMIN_EMAIL: String(process.env.ADMIN_EMAIL || "admin@ubl.ac.id")
    .trim()
    .toLowerCase(),
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin123",
};
