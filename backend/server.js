const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

const { testConnection } = require("./config/db");
const initDb = require("./config/initDb");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AcademiX Backend Running");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
  await testConnection();
  await initDb();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

bootstrap();