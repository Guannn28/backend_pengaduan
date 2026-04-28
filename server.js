const express = require("express");
const { initDb } = require("./config/db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server hidup 🚀");
});

const PORT = process.env.PORT || 3000;

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});