const express = require("express");
const cors = require("cors");
const { initDb } = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express(); // ✅ HARUS DI ATAS

// middleware
app.use(cors({
  origin: "https://pengaduan-pulz.vercel.app",
  credentials: true
}));

app.use(express.json());

// routes
app.use("/api", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server hidup 🚀");
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await initDb();
    console.log("DB connected");
  } catch (err) {
    console.error("DB error:", err.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();