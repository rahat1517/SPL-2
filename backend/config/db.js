const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "academix_user",
  password: "password123",
  database: "academix"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;