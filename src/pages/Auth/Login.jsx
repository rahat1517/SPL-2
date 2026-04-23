import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAuth } from "../../store/authstore";
import { loginUser } from "../../api/authService";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const getDashboardPathByRole = (role) => {
    switch (role) {
      case "student": return "/student/dashboard";
      case "teacher": return "/teacher/dashboard";
      case "staff": return "/staff/dashboard";
      case "superadmin": return "/admin/dashboard";
      default: return "/login";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);
    try {
      const res = await loginUser({ email, password });
      if (!res.ok) {
        const message = (res.message || "").toLowerCase();
        setIsSubmitting(false);
        if (
          message.includes("verify otp") ||
          message.includes("verify your otp") ||
          message.includes("please verify otp") ||
          message.includes("please verify")
        ) {
          navigate("/verify-otp", { state: { email } });
          return;
        }
        setError(res.message || "Login failed.");
        return;
      }
      loginAuth(res.user, res.token);
      localStorage.setItem("role", res.user.role);
      setSuccess("Login successful! Redirecting...");
      setIsSubmitting(false);
      setTimeout(() => navigate(getDashboardPathByRole(res.user.role)), 700);
    } catch (err) {
      console.error(err);
      setError("Something went wrong during login.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          background: #09090f;
          position: relative;
          overflow: hidden;
          padding: 24px;
        }

        .bg-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.12;
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
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .card {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 48px 44px;
          backdrop-filter: blur(28px);
          position: relative;
          z-index: 2;
          animation: rise 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(28px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 36px;
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

        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .card-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
          margin-bottom: 32px;
        }

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

        .field-group { margin-bottom: 16px; }

        .field-label {
          display: block;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 7px;
          transition: color 0.2s;
        }
        .field-group.focused .field-label { color: #818cf8; }

        .field-wrap { position: relative; }

        .field-input {
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
        .field-input::placeholder { color: rgba(255,255,255,0.16); }
        .field-input:focus {
          border-color: rgba(129,140,248,0.55);
          background: rgba(79,70,229,0.07);
          box-shadow: 0 0 0 3px rgba(79,70,229,0.13);
        }
        .field-input:-webkit-autofill,
        .field-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #111118 inset;
          -webkit-text-fill-color: #fff;
        }

        .field-icon {
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
        .field-icon:hover { color: #818cf8; }

        .btn-submit {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 11px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 8px;
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

        .form-footer { margin-top: 28px; text-align: center; }
        .footer-row {
          font-size: 13px;
          color: rgba(255,255,255,0.28);
          margin-bottom: 8px;
        }
        .footer-link {
          color: #818cf8;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #a5b4fc; }
        .sep { height: 1px; background: rgba(255,255,255,0.06); margin: 20px 0; }

        @media (max-width: 480px) {
          .card { padding: 36px 28px; }
        }
      `}</style>

      <div className="login-root">
        <div className="bg-grid" />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />

        <div className="card">
          <div className="logo-wrap">
            <div className="logo-icon">🎓</div>
            <span className="logo-name">AcademiX</span>
          </div>

          <h1 className="card-title">Welcome back</h1>
          <p className="card-sub">Sign in to your institutional account</p>

          {error && (
            <div className="alert alert-error">
              <span>⚠</span> {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success">
              <span>✓</span> {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={`field-group${focusedField === "email" ? " focused" : ""}`}>
              <label className="field-label">Institute Email</label>
              <div className="field-wrap">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="field-input"
                  placeholder="you@iit.edu"
                  required
                />
                <span className="field-icon">✉</span>
              </div>
            </div>

            <div className={`field-group${focusedField === "password" ? " focused" : ""}`}>
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="field-input"
                  placeholder="••••••••••"
                  required
                />
                <span
                  className="field-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </span>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-submit">
              {isSubmitting && <span className="spinner" />}
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="form-footer">
            <div className="footer-row">
              <Link to="/forgot-password" className="footer-link">
                Forgot your password?
              </Link>
            </div>
            <div className="sep" />
            <div className="footer-row">
              No account?{" "}
              <Link to="/register" className="footer-link">
                Register now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
