const { pool } = require("./db");

const initDb = async () => {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      first_name VARCHAR(80) NOT NULL,
      last_name VARCHAR(80) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(20) NOT NULL,
      role ENUM('student', 'teacher', 'staff', 'superadmin') NOT NULL,
      reg_no VARCHAR(20) NULL,
      roll_no VARCHAR(20) NULL,
      password_hash VARCHAR(255) NOT NULL,
      status ENUM('pending', 'approved') NOT NULL DEFAULT 'pending',
      is_verified TINYINT(1) NOT NULL DEFAULT 0,
      otp_hash VARCHAR(255) NULL,
      otp_expires_at DATETIME NULL,
      otp_attempts INT NOT NULL DEFAULT 0,
      otp_last_sent_at DATETIME NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  await pool.query(createUsersTableQuery);
};

module.exports = initDb;