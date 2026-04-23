import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp, resetPassword, verifyUser } from "../../api/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    if (!email.endsWith("@du.ac.bd") && !email.endsWith("@iit.du.ac.bd")) {
      setError("Must be an official DU/IIT email address.");
      return;
    }
    setLoading(true);
    const res1 = await verifyUser({ email });
    if (!res1.ok) { setLoading(false); setError(res1.message); return; }
    const res2 = await sendOtp({ email, purpose: "forgot_password" });
    setLoading(false);
    if (!res2.ok) { setError(res2.message); return; }
    setMessage(res2.message || "OTP sent successfully.");
    setStep("otp");
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    setLoading(true);
    const res = await verifyOtp({ email, otp, purpose: "forgot_password" });
    setLoading(false);
    if (!res.ok) { setError(res.message); return; }
    setMessage(res.message || "OTP verified successfully.");
    setStep("password");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    const res = await resetPassword({ email, newPassword });
    setLoading(false);
    if (!res.ok) { setError(res.message); return; }
    setMessage(res.message || "Password reset successful.");
    setTimeout(() => navigate("/login"), 1200);
  };

  const steps = ["email", "otp", "password"];
  const stepIndex = steps.indexOf(step);
  const stepLabels = ["Email", "Verify OTP", "New Password"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .fp-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          background: #09090f;
          position: relative;
          overflow: hidden;
          padding: 32px 24px;
        }

        .bg-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.11;
          animation: drift 20s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .bg-orb-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, #4f46e5, #7c3aed);
          top: -280px; left: -200px;
        }
        .bg-orb-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #0ea5e9, #06b6d4);
          bottom: -180px; right: -150px;
          animation-delay: -8s;
        }
        @keyframes drift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(30px,20px) scale(1.06); }
        }
        .bg-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* Card */
        .card {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 44px 44px 40px;
          backdrop-filter: blur(28px);
          position: relative;
          z-index: 2;
          animation: rise 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(28px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Logo */
        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
        }
        .logo-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          box-shadow: 0 4px 16px rgba(79,70,229,0.35);
        }
        .logo-name {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
        }

        /* Step indicator */
        .stepper {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 28px;
        }
        .step-item {
          display: flex;
          align-items: center;
          flex: 1;
        }
        .step-dot {
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          flex-shrink: 0;
          transition: background 0.3s, border-color 0.3s;
        }
        .step-dot.done {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #fff;
          box-shadow: 0 2px 10px rgba(79,70,229,0.4);
          border: none;
        }
        .step-dot.active {
          background: rgba(79,70,229,0.15);
          border: 1.5px solid rgba(129,140,248,0.6);
          color: #818cf8;
        }
        .step-dot.pending {
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.2);
        }
        .step-line {
          flex: 1;
          height: 1px;
          margin: 0 6px;
          transition: background 0.3s;
        }
        .step-line.done { background: rgba(79,70,229,0.5); }
        .step-line.pending { background: rgba(255,255,255,0.07); }

        /* Heading */
        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 5px;
        }
        .card-sub {
          font-size: 13.5px;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
          margin-bottom: 28px;
          line-height: 1.5;
        }
        .card-sub span {
          color: #818cf8;
          font-weight: 500;
        }

        /* Alerts */
        .alert {
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 13px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 9px;
          animation: rise 0.3s ease both;
        }
        .alert-error  { background: rgba(239,68,68,0.1);  border: 1px solid rgba(239,68,68,0.22);  color: #fca5a5; }
        .alert-success{ background: rgba(34,197,94,0.1);  border: 1px solid rgba(34,197,94,0.22);  color: #86efac; }

        /* Fields */
        .field-wrap { position: relative; margin-bottom: 14px; }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 11px;
          padding: 13px 15px;
          font-size: 14.5px;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.18); }
        .field-input:focus {
          border-color: rgba(129,140,248,0.55);
          background: rgba(79,70,229,0.07);
          box-shadow: 0 0 0 3px rgba(79,70,229,0.13);
        }
        .field-input.readonly {
          opacity: 0.45;
          cursor: default;
        }
        .field-input:-webkit-autofill,
        .field-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #111118 inset;
          -webkit-text-fill-color: #fff;
        }

        .pw-wrap { position: relative; margin-bottom: 14px; }
        .pw-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 11px;
          padding: 13px 44px 13px 15px;
          font-size: 14.5px;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .pw-input::placeholder { color: rgba(255,255,255,0.18); }
        .pw-input:focus {
          border-color: rgba(129,140,248,0.55);
          background: rgba(79,70,229,0.07);
          box-shadow: 0 0 0 3px rgba(79,70,229,0.13);
        }
        .pw-input:-webkit-autofill,
        .pw-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #111118 inset;
          -webkit-text-fill-color: #fff;
        }
        .pw-eye {
          position: absolute;
          right: 13px; top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.22);
          font-size: 16px;
          cursor: pointer;
          user-select: none;
          transition: color 0.2s;
          line-height: 1;
        }
        .pw-eye:hover { color: #818cf8; }

        /* OTP input special */
        .otp-input {
          text-align: center;
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.25em;
        }

        /* Button */
        .btn-submit {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 11px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 4px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #fff;
          box-shadow: 0 4px 20px rgba(79,70,229,0.38);
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-submit:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(79,70,229,0.5);
        }
        .btn-submit:not(:disabled):active { transform: translateY(0); }
        .btn-submit:disabled { opacity: 0.55; cursor: not-allowed; }
        .btn-submit::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 55%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: shimmer 2.8s infinite;
        }
        @keyframes shimmer { to { left: 200%; } }

        .spinner {
          display: inline-block;
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Footer */
        .form-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 13px;
          color: rgba(255,255,255,0.28);
        }
        .footer-link {
          color: #818cf8;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #a5b4fc; }

        @media (max-width: 480px) {
          .card { padding: 36px 22px 32px; }
        }
      `}</style>

      <div className="fp-root">
        <div className="bg-grid" />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />

        <div className="card">
          {/* Logo */}
          <div className="logo-wrap">
            <div className="logo-icon">🎓</div>
            <span className="logo-name">AcademiX</span>
          </div>

          {/* Step indicator */}
          <div className="stepper">
            {stepLabels.map((label, i) => (
              <div key={i} className="step-item">
                <div
                  className={`step-dot ${
                    i < stepIndex ? "done" : i === stepIndex ? "active" : "pending"
                  }`}
                >
                  {i < stepIndex ? "✓" : i + 1}
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`step-line ${i < stepIndex ? "done" : "pending"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Titles per step */}
          {step === "email" && (
            <>
              <h1 className="card-title">Forgot password?</h1>
              <p className="card-sub">Enter your official email and we'll send you a verification code.</p>
            </>
          )}
          {step === "otp" && (
            <>
              <h1 className="card-title">Check your email</h1>
              <p className="card-sub">We sent a code to <span>{email}</span></p>
            </>
          )}
          {step === "password" && (
            <>
              <h1 className="card-title">Set new password</h1>
              <p className="card-sub">Choose a strong password between 8–15 characters.</p>
            </>
          )}

          {/* Alerts */}
          {error && (
            <div className="alert alert-error"><span>⚠</span> {error}</div>
          )}
          {message && (
            <div className="alert alert-success"><span>✓</span> {message}</div>
          )}

          {/* Step: Email */}
          {step === "email" && (
            <form onSubmit={handleSendOtp}>
              <div className="field-wrap">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="field-input"
                  placeholder="Official email (example@du.ac.bd)"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-submit">
                {loading && <span className="spinner" />}
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* Step: OTP */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>
              <div className="field-wrap">
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="field-input readonly"
                />
              </div>
              <div className="field-wrap">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  onFocus={() => setFocusedField("otp")}
                  onBlur={() => setFocusedField(null)}
                  className="field-input otp-input"
                  placeholder="——————"
                  maxLength={6}
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-submit">
                {loading && <span className="spinner" />}
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {/* Step: New Password */}
          {step === "password" && (
            <form onSubmit={handleResetPassword}>
              <div className="pw-wrap">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pw-input"
                  placeholder="New Password"
                  required
                />
                <span className="pw-eye" onClick={() => setShowNew(!showNew)}>
                  {showNew ? "🙈" : "👁"}
                </span>
              </div>
              <div className="pw-wrap">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pw-input"
                  placeholder="Confirm New Password"
                  required
                />
                <span className="pw-eye" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? "🙈" : "👁"}
                </span>
              </div>
              <button type="submit" disabled={loading} className="btn-submit">
                {loading && <span className="spinner" />}
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <p className="form-footer">
            <Link to="/login" className="footer-link">← Back to login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
