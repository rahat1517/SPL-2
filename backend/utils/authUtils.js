const crypto = require("crypto");

const OTP_EXPIRY_MINUTES = 2;
const OTP_MAX_ATTEMPTS = 5;
const OTP_RESEND_COOLDOWN_SECONDS = 120;

const hashOtp = (otp) =>
  crypto.createHash("sha256").update(String(otp)).digest("hex");

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const buildOtpMeta = () => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);

  return {
    now,
    expiresAt,
  };
};

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

const verifyPassword = (password, storedHash) => {
  const [salt, originalHash] = storedHash.split(":");
  if (!salt || !originalHash) return false;
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(originalHash, "hex"), Buffer.from(hash, "hex"));
};

module.exports = {
  OTP_EXPIRY_MINUTES,
  OTP_MAX_ATTEMPTS,
  OTP_RESEND_COOLDOWN_SECONDS,
  buildOtpMeta,
  generateOtp,
  hashOtp,
  hashPassword,
  verifyPassword,
};