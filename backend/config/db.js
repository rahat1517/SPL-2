const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "academix_user",
  password: process.env.DB_PASSWORD || "password123",
  database: process.env.DB_NAME || "academix",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log("MySQL Connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

module.exports = {
  pool,
  testConnection,
};
