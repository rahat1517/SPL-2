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
    } catch (error) {
      console.error(error);
      setError("Something went wrong during login.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0f;
          overflow: hidden;
          position: relative;
        }

        /* Animated background */
        .bg-canvas {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: drift 18s ease-in-out infinite alternate;
        }
        .bg-orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #4f46e5, #7c3aed);
          top: -200px; left: -150px;
          animation-delay: 0s;
        }
        .bg-orb-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #0891b2, #06b6d4);
          bottom: -150px; right: -100px;
          animation-delay: -6s;
        }
        .bg-orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #7c3aed, #a855f7);
          top: 40%; left: 60%;
          animation-delay: -12s;
        }

        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, 30px) scale(1.08); }
        }

        /* Grid lines */
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* Split layout */
        .login-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 70px;
          position: relative;
          z-index: 2;
        }

        .brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(79, 70, 229, 0.15);
          border: 1px solid rgba(79, 70, 229, 0.3);
          border-radius: 100px;
          padding: 6px 16px;
          margin-bottom: 48px;
          width: fit-content;
        }
        .brand-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #818cf8;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .brand-badge-text {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #818cf8;
        }

        .hero-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 800;
          line-height: 1.1;
          color: #fff;
          margin-bottom: 20px;
        }
        .hero-headline span {
          background: linear-gradient(135deg, #818cf8, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.45);
          max-width: 380px;
          font-weight: 300;
        }

        .hero-stats {
          display: flex;
          gap: 40px;
          margin-top: 56px;
        }
        .stat-item {}
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
        }
        .stat-label {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 2px;
        }
        .stat-divider {
          width: 1px;
          background: rgba(255,255,255,0.08);
          align-self: stretch;
        }

        /* Right panel - the form card */
        .login-right {
          width: 480px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 48px;
          position: relative;
          z-index: 2;
          background: rgba(255,255,255,0.02);
          border-left: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
        }

        .form-inner {
          width: 100%;
          animation: fadeUp 0.6s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }
        .form-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 36px;
          font-weight: 300;
        }

        /* Alerts */
        .alert {
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 13.5px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: fadeUp 0.3s ease both;
        }
        .alert-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #fca5a5;
        }
        .alert-success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #86efac;
        }
        .alert-icon {
          font-size: 16px;
          flex-shrink: 0;
        }

        /* Field wrapper */
        .field-group {
          margin-bottom: 18px;
        }
        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 8px;
          transition: color 0.2s;
        }
        .field-group.focused .field-label {
          color: #818cf8;
        }

        .field-wrap {
          position: relative;
        }
        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px 48px 14px 16px;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          -webkit-autofill: unset;
        }
        .field-input::placeholder {
          color: rgba(255,255,255,0.18);
        }
        .field-input:focus {
          border-color: rgba(129, 140, 248, 0.5);
          background: rgba(79, 70, 229, 0.06);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
        }
        .field-input:-webkit-autofill,
        .field-input:-webkit-autofill:hover,
        .field-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #13131a inset;
          -webkit-text-fill-color: #fff;
        }

        .field-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.25);
          font-size: 17px;
          cursor: pointer;
          transition: color 0.2s;
          user-select: none;
          line-height: 1;
        }
        .field-icon:hover { color: #818cf8; }

        /* Submit button */
        .btn-submit {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          margin-top: 10px;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #fff;
          box-shadow: 0 4px 24px rgba(79, 70, 229, 0.4);
        }
        .btn-submit:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(79, 70, 229, 0.5);
        }
        .btn-submit:not(:disabled):active {
          transform: translateY(0);
        }
        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Shimmer on button */
        .btn-submit::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          animation: shimmer 2.5s infinite;
        }
        @keyframes shimmer {
          to { left: 200%; }
        }

        .btn-spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Links section */
        .form-links {
          margin-top: 28px;
          text-align: center;
        }
        .form-link-row {
          font-size: 13.5px;
          color: rgba(255,255,255,0.3);
          margin-bottom: 10px;
        }
        .form-link {
          color: #818cf8;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .form-link:hover { color: #a5b4fc; }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }
        .divider-text {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Mobile responsive */
        @media (max-width: 900px) {
          .login-left { display: none; }
          .login-right {
            width: 100%;
            border-left: none;
            padding: 40px 28px;
          }
        }
      `}</style>

      <div className="login-root">
        {/* Background */}
        <div className="bg-canvas">
          <div className="bg-grid" />
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />
        </div>

        {/* Left hero panel */}
        <div className="login-left">
          <div className="brand-badge">
            <div className="brand-badge-dot" />
            <span className="brand-badge-text">AcademiX Platform</span>
          </div>

          <h1 className="hero-headline">
            Your campus,<br />
            <span>reimagined.</span>
          </h1>
          <p className="hero-sub">
            One unified platform for students, teachers, and staff. Manage academics, schedules, and communication — all in one place.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">12K+</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-num">480+</div>
              <div className="stat-label">Faculty</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-num">98%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="login-right">
          <div className="form-inner">
            <h2 className="form-title">Welcome back</h2>
            <p className="form-subtitle">Sign in to your institutional account</p>

            {error && (
              <div className="alert alert-error">
                <span className="alert-icon">⚠</span>
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success">
                <span className="alert-icon">✓</span>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className={`field-group${focusedField === 'email' ? ' focused' : ''}`}>
                <label className="field-label">Institute Email</label>
                <div className="field-wrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="field-input"
                    placeholder="you@iit.edu"
                    required
                  />
                  <span className="field-icon">✉</span>
                </div>
              </div>

              {/* Password */}
              <div className={`field-group${focusedField === 'password' ? ' focused' : ''}`}>
                <label className="field-label">Password</label>
                <div className="field-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="field-input"
                    placeholder="••••••••••"
                    required
                  />
                  <span
                    className="field-icon"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-submit"
              >
                {isSubmitting && <span className="btn-spinner" />}
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="form-links">
              <div className="form-link-row">
                <Link to="/forgot-password" className="form-link">
                  Forgot your password?
                </Link>
              </div>

              <div className="divider">
                <div className="divider-line" />
                <span className="divider-text">New here?</span>
                <div className="divider-line" />
              </div>

              <div className="form-link-row">
                Don't have an account?{" "}
                <Link to="/register" className="form-link">
                  Create account →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
