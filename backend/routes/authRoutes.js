const express = require("express");
const crypto = require("crypto");
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

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();
const toSeconds = (dateA, dateB) => Math.floor((new Date(dateA).getTime() - new Date(dateB).getTime()) / 1000);

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
      batch
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !role || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (!["student", "teacher", "staff"].includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }

    if (role === "student" && (!regNo || !rollNo || !batch)) {
      return res.status(400).json({ message: "Students must provide registration and roll number." });
    }

    const normalizedEmail = normalizeEmail(email);

    const [existing] = await pool.query("SELECT id FROM users WHERE email = ? LIMIT 1", [normalizedEmail]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const otp = generateOtp();
    const { expiresAt, now } = buildOtpMeta();
    const passwordHash = hashPassword(password);

    await pool.query(
      `INSERT INTO users
      (first_name, last_name, email, phone, role, reg_no, roll_no, batch, password_hash, status, is_verified, otp_hash, otp_expires_at, otp_attempts, otp_last_sent_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 0, ?, ?, 0, ?)`,
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
        hashOtp(otp),
        expiresAt,
        now,
      ]
    );

    const emailInfo = await sendOtpEmail({ to: normalizedEmail, otp });

    return res.status(201).json({
      message: "Registration successful. OTP sent to your email.",
      email: normalizedEmail,
      otpSent: emailInfo.delivered,
      devMessage: emailInfo.delivered ? undefined : emailInfo.message,
    });
  } catch (error) {
    console.error("register error", error);
    return res.status(500).json({ message: "Failed to register user." });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const otp = String(req.body.otp || "").trim();

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const [rows] = await pool.query(
      "SELECT id, otp_hash, otp_expires_at, otp_attempts, is_verified FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = rows[0];

    if (user.is_verified) {
      return res.status(200).json({ message: "Account already verified." });
    }

    if (!user.otp_hash || !user.otp_expires_at) {
      return res.status(400).json({ message: "No active OTP found. Please request a new OTP." });
    }

    if (user.otp_attempts >= OTP_MAX_ATTEMPTS) {
      return res.status(429).json({ message: "Too many invalid attempts. Please request a new OTP." });
    }

    if (new Date(user.otp_expires_at) < new Date()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new OTP." });
    }

    if (hashOtp(otp) !== user.otp_hash) {
      await pool.query("UPDATE users SET otp_attempts = otp_attempts + 1 WHERE id = ?", [user.id]);
      return res.status(400).json({ message: "Invalid OTP." });
    }

    await pool.query(
      "UPDATE users SET is_verified = 1, otp_hash = NULL, otp_expires_at = NULL, otp_attempts = 0 WHERE id = ?",
      [user.id]
    );

    return res.status(200).json({ message: "OTP verified successfully. Wait for Super Admin approval." });
  } catch (error) {
    console.error("verify otp error", error);
    return res.status(500).json({ message: "Failed to verify OTP." });
  }
});

router.post("/resend-otp", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const [rows] = await pool.query(
      "SELECT id, is_verified, otp_last_sent_at FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = rows[0];
    if (user.is_verified) {
      return res.status(400).json({ message: "Account is already verified." });
    }

    if (user.otp_last_sent_at) {
      const elapsedSeconds = toSeconds(new Date(), user.otp_last_sent_at);
      if (elapsedSeconds < OTP_RESEND_COOLDOWN_SECONDS) {
        return res.status(429).json({
          message: `Please wait ${OTP_RESEND_COOLDOWN_SECONDS - elapsedSeconds}s before resending OTP.`,
        });
      }
    }

    const otp = generateOtp();
    const { expiresAt, now } = buildOtpMeta();
    await pool.query(
      "UPDATE users SET otp_hash = ?, otp_expires_at = ?, otp_attempts = 0, otp_last_sent_at = ? WHERE id = ?",
      [hashOtp(otp), expiresAt, now, user.id]
    );

    const emailInfo = await sendOtpEmail({ to: email, otp });

    return res.status(200).json({
      message: "OTP resent successfully.",
      otpSent: emailInfo.delivered,
      devMessage: emailInfo.delivered ? undefined : emailInfo.message,
    });
  } catch (error) {
    console.error("resend otp error", error);
    return res.status(500).json({ message: "Failed to resend OTP." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const [rows] = await pool.query(
      "SELECT id, first_name, last_name, email, role, status, is_verified, password_hash FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0 || !verifyPassword(password, rows[0].password_hash)) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = rows[0];

    if (!user.is_verified) {
      return res.status(403).json({ message: "Please verify OTP before login." });
    }

    if (user.status !== "approved" && user.role !== "superadmin") {
      return res.status(403).json({ message: "Your account is pending Super Admin approval." });
    }

    const token = crypto.randomBytes(32).toString("hex");

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("login error", error);
    return res.status(500).json({ message: "Failed to login." });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const newPassword = String(req.body.newPassword || "");

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required." });
    }

    const [rows] = await pool.query("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "No account found with this email." });
    }

    await pool.query("UPDATE users SET password_hash = ? WHERE id = ?", [hashPassword(newPassword), rows[0].id]);
    return res.status(200).json({ message: "Password reset successful. Please login." });
  } catch (error) {
    console.error("forgot password error", error);
    return res.status(500).json({ message: "Failed to reset password." });
  }
});

router.get("/otp-config", (req, res) => {
  res.status(200).json({
    resendCooldownSeconds: OTP_RESEND_COOLDOWN_SECONDS,
  });
});

module.exports = router;
