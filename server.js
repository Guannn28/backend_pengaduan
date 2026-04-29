const app = require("./app");
const { initDb } = require("./config/db");
const env = require("./config/env");

const PORT = env.PORT;

(async () => {
  try {
    await initDb();
    console.log(`MongoDB connected (${env.MONGODB_DB_NAME})`);
  } catch (err) {
    console.error("DB error:", err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
