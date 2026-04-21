const jwt = require("jsonwebtoken");
const express = require("express");

const { pool } = require("../config/db");
const { sendOtpEmail } = require("../services/emailService");
const {
  OTP_MAX_ATTEMPTS,
  OTP_RESEND_COOLDOWN_SECONDS,
  buildOtpMeta,
  generateOtp,
  hashOtp,
  hashPassword,
  verifyPassword,
} = require("../utils/authUtils");

const router = express.Router();

const normalizeEmail = (email) =>
  String(email || "")
    .trim()
    .toLowerCase();

const toSeconds = (dateA, dateB) =>
  Math.floor((new Date(dateA).getTime() - new Date(dateB).getTime()) / 1000);

router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      role,
      regNo,
      rollNo,
      password,
      batch,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !role || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (!["student", "teacher", "staff"].includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }

    if (role === "student" && (!regNo || !rollNo || !batch)) {
      return res.status(400).json({
        message:
          "Students must provide registration and roll number and batch!",
      });
    }

    const normalizedEmail = normalizeEmail(email);

    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [normalizedEmail],
    );

    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: "An account with this email already exists." });
    }

    const passwordHash = hashPassword(password);

    await pool.query(
      `INSERT INTO users
      (
        first_name,
        last_name,
        email,
        phone,
        role,
        reg_no,
        roll_no,
        batch,
        password_hash,
        status,
        is_verified
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 0)`,
      [
        firstName,
        lastName,
        normalizedEmail,
        phone,
        role,
        regNo || null,
        rollNo || null,
        batch || null,
        passwordHash,
      ],
    );

    return res.status(201).json({
      message: "Registration successful. Please verify your account.",
      email: normalizedEmail,
    });
  } catch (error) {
    console.error("register error", error);
    return res.status(500).json({ message: "Failed to register user." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const [rows] = await pool.query(
      `SELECT id, first_name, last_name, email, phone, role, reg_no, roll_no, status, is_verified, password_hash, batch
       FROM users
       WHERE email = ? LIMIT 1`,
      [email]
    );

    if (rows.length === 0 || !verifyPassword(password, rows[0].password_hash)) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = rows[0];

    if (!user.is_verified) {
      return res
        .status(403)
        .json({ message: "Please verify OTP before login." });
    }

    if (user.status !== "approved" && user.role !== "superadmin") {
      return res.status(403).json({
        message: "Your account is pending Super Admin approval.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        regNo: user.reg_no,
        rollNo: user.roll_no,
        status: user.status,
        batch: user.batch,
        is_verified : Boolean(user.is_verified),
      },
    });
  } catch (error) {
    console.error("login error", error);
    return res.status(500).json({ message: "Failed to login." });
  }
});

router.get("/admin/users", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        id,
        first_name,
        last_name,
        email,
        phone,
        role,
        reg_no,
        roll_no,
        batch,
        status,
        is_verified,
        created_at,
        updated_at
       FROM users
       WHERE role != 'superadmin'
       ORDER BY created_at DESC`
    );

    return res.status(200).json({ users: rows });
  } catch (error) {
    console.error("admin get users error", error);
    return res.status(500).json({ message: "Failed to fetch users." });
  }
});

router.put("/admin/users/:id/approve", async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    if (!role || !["student", "teacher", "staff"].includes(role)) {
      return res.status(400).json({ message: "Valid role is required." });
    }

    const [rows] = await pool.query(
      "SELECT id, is_verified, status FROM users WHERE id = ? LIMIT 1",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = rows[0];

    if (!user.is_verified) {
      return res.status(400).json({
        message: "Only OTP-verified users can be approved.",
      });
    }

    await pool.query(
      `UPDATE users
       SET role = ?, status = 'approved'
       WHERE id = ?`,
      [role, userId]
    );

    return res.status(200).json({
      message: "User approved successfully.",
    });
  } catch (error) {
    console.error("admin approve user error", error);
    return res.status(500).json({ message: "Failed to approve user." });
  }
});

router.put("/admin/users/:id/role", async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    if (!role || !["student", "teacher", "staff"].includes(role)) {
      return res.status(400).json({ message: "Valid role is required." });
    }

    const [rows] = await pool.query(
      "SELECT id FROM users WHERE id = ? LIMIT 1",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    await pool.query(
      `UPDATE users
       SET role = ?
       WHERE id = ?`,
      [role, userId]
    );

    return res.status(200).json({
      message: "User role updated successfully.",
    });
  } catch (error) {
    console.error("admin update role error", error);
    return res.status(500).json({ message: "Failed to update role." });
  }
});

router.delete("/admin/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const [rows] = await pool.query(
      "SELECT id FROM users WHERE id = ? LIMIT 1",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    await pool.query("DELETE FROM users WHERE id = ?", [userId]);

    return res.status(200).json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("admin delete user error", error);
    return res.status(500).json({ message: "Failed to delete user." });
  }
});

router.post("/verify-user", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const [rows] = await pool.query(
      "SELECT id, is_verified FROM users WHERE email = ? LIMIT 1",
      [email],
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No account found with this email." });
    }

    return res.status(200).json({
      message: "User exists.",
      email,
      isVerified: !!rows[0].is_verified,
    });
  } catch (error) {
    console.error("verify user error", error);
    return res.status(500).json({ message: "Failed to verify user." });
  }
});

router.post("/password-reset", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const newPassword = String(req.body.newPassword || "");

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and new password are required." });
    }

    if (newPassword.length < 8 || newPassword.length > 15) {
      return res
        .status(400)
        .json({ message: "Password must be between 8-15 characters." });
    }

    const [rows] = await pool.query(
      `SELECT id, is_verified, status
       FROM users
       WHERE email = ? LIMIT 1`,
      [email],
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No account found with this email." });
    }

    const user = rows[0];
    if (user.status != "approved") {
      return res
        .status(403)
        .json({ message: "Please verify OTP before resetting password.User must have a verified account to reset password." });
    }
    

    await pool.query(
      `UPDATE users
       SET password_hash = ?
       WHERE id = ?`,
      [hashPassword(newPassword), user.id],
    );

    return res.status(200).json({
      message: "Password reset successful. Please login.",
    });
  } catch (error) {
    console.error("forgot password reset error", error);
    return res.status(500).json({ message: "Failed to reset password." });
  }
});

router.post("/send-otp", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const purpose = req.body.purpose;

    if (!email || !purpose) {
      return res
        .status(400)
        .json({ message: "Email and purpose are required." });
    }

    if (!["register", "forgot_password"].includes(purpose)) {
      return res.status(400).json({ message: "Invalid purpose." });
    }

    const [rows] = await pool.query(
      "SELECT id, is_verified FROM users WHERE email = ? LIMIT 1",
      [email],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = rows[0];

    if (purpose === "register" && user.is_verified) {
      return res.status(400).json({ message: "Account already verified." });
    }

    const [existingOtp] = await pool.query(
      "SELECT last_sent_at FROM otps WHERE email = ? AND purpose = ? LIMIT 1",
      [email, purpose],
    );

    if (existingOtp.length > 0 && existingOtp[0].last_sent_at) {
      const elapsedSeconds = toSeconds(new Date(), existingOtp[0].last_sent_at);

      if (elapsedSeconds < OTP_RESEND_COOLDOWN_SECONDS) {
        return res.status(429).json({
          message: `Please wait ${
            OTP_RESEND_COOLDOWN_SECONDS - elapsedSeconds
          }s before requesting another OTP.`,
        });
      }
    }

    const otp = generateOtp();
    const { expiresAt, now } = buildOtpMeta();

    await pool.query("DELETE FROM otps WHERE email = ? AND purpose = ?", [
      email,
      purpose,
    ]);

    await pool.query(
      `INSERT INTO otps (email, otp_hash, purpose, expires_at, attempts, last_sent_at)
       VALUES (?, ?, ?, ?, 0, ?)`,
      [email, hashOtp(otp), purpose, expiresAt, now],
    );

    const emailInfo = await sendOtpEmail({ to: email, otp });

    return res.status(200).json({
      message: "OTP sent successfully.",
      otpSent: emailInfo.delivered,
    });
  } catch (error) {
    console.error("send otp error", error);
    return res.status(500).json({ message: "Failed to send OTP." });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const otp = String(req.body.otp || "").trim();
    const purpose = req.body.purpose; 

    if (!email || !otp || !purpose) {
      return res.status(400).json({
        message: "Email, OTP, and purpose are required.",
      });
    }

    if (!["register", "forgot_password"].includes(purpose)) {
      return res.status(400).json({ message: "Invalid purpose." });
    }

    const [users] = await pool.query(
      "SELECT id, is_verified FROM users WHERE email = ? LIMIT 1",
      [email],
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = users[0];

    const [rows] = await pool.query(
      "SELECT * FROM otps WHERE email = ? AND purpose = ? LIMIT 1",
      [email, purpose],
    );

    if (rows.length === 0) {
      return res.status(400).json({
        message: "No active OTP. Please request OTP first.",
      });
    }

    const otpRecord = rows[0];

    if (new Date(otpRecord.expires_at) < new Date()) {
      return res.status(400).json({
        message: "OTP expired. Please request a new one.",
      });
    }

    if (otpRecord.attempts >= OTP_MAX_ATTEMPTS) {
      return res.status(429).json({
        message: "Too many attempts. Request a new OTP.",
      });
    }

    if (hashOtp(otp) !== otpRecord.otp_hash) {
      await pool.query("UPDATE otps SET attempts = attempts + 1 WHERE id = ?", [
        otpRecord.id,
      ]);
      return res.status(400).json({ message: "Invalid OTP." });
    }

    await pool.query("DELETE FROM otps WHERE id = ?", [otpRecord.id]);

    if (purpose === "register") {
      await pool.query("UPDATE users SET is_verified = 1 WHERE id = ?", [
        user.id,
      ]);
    }

    if (purpose === "forgot_password") {
      return res.status(200).json({
        message: "OTP verified. You can now reset your password.",
        allowPasswordReset: true,
      });
    }

    return res.status(200).json({
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error("verify otp error", error);
    return res.status(500).json({ message: "Failed to verify OTP." });
  }
});

router.get("/otp-config", (req, res) => {
  res.status(200).json({
    resendCooldownSeconds: OTP_RESEND_COOLDOWN_SECONDS,
  });
});

module.exports = router;
