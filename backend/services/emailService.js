const nodemailer = require("nodemailer");

const sendOtpEmail = async ({ to, otp }) => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
  const emailPort = Number(process.env.EMAIL_PORT || 587);
  const emailSecure = String(process.env.EMAIL_SECURE) === "true";
  const emailFrom = process.env.EMAIL_FROM || emailUser;

  if (!emailUser || !emailPass) {
    console.log(`[DEV OTP] email=${to} otp=${otp}`);
    return {
      delivered: false,
      message: "Email provider is not configured. OTP logged in server output for development.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
      from: emailFrom,
      to,
      subject: "AcademiX OTP Verification",
      text: `Your verification OTP is ${otp}. It expires in 2 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>AcademiX OTP Verification</h2>
          <p>Your verification OTP is:</p>
          <h1 style="letter-spacing: 4px;">${otp}</h1>
          <p>It expires in 2 minutes.</p>
        </div>
      `,
    });

    return {
      delivered: true,
      message: "OTP sent to email.",
    };
  } catch (error) {
    console.error("Email sending failed:", error.message);
    console.log(`[DEV OTP] email=${to} otp=${otp}`);
    return {
      delivered: false,
      message: `Email sending failed: ${error.message}`,
    };
  }
};

module.exports = {
  sendOtpEmail,
};