import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authService";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    regNo: "",
    rollNo: "",
    batch: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      setError("Please fill all required fields.");
      return;
    }
    if (!formData.email.endsWith("@du.ac.bd") && !formData.email.endsWith("@iit.du.ac.bd") && !formData.email.endsWith("@it.du.ac.bd")) {
      setError("Please use your official DU/IIT email address.");
      return;
    }
    if (formData.phone.length !== 11) {
      setError("Phone number is invalid.");
      return;
    }
    if (formData.password.length < 8 || formData.password.length > 15) {
      setError("Password must be between 8-15 characters.");
      return;
    }
    if (role === "student") {
      if (!formData.regNo || !formData.rollNo) {
        setError("Students must provide DU registration and roll number.");
        return;
      }
      if (formData.rollNo.length !== 4) {
        setError("Roll number must be exactly 4 digits.");
        return;
      }
      if (formData.regNo.length !== 10) {
        setError("Registration number must be exactly 10 digits");
        return;
      }
      if (!formData.batch) {
        setError("Please select your Year");
        return;
      }
    }

    setIsSubmitting(true);
    const response = await registerUser({ ...formData, role });
    setIsSubmitting(false);
    if (!response.ok) {
      setError(response.message);
      return;
    }
    navigate("/submission", { state: { email: response.email } });
  };

  const F = ({ name, type = "text", placeholder, colSpan, disabled }) => (
    <div
      className={`field-group${focusedField === name ? " focused" : ""}${colSpan ? " col2" : ""}`}
    >
      <div className="field-wrap">
        <input
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          className={`field-input${disabled ? " field-disabled" : ""}`}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
        />
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .reg-root {
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
          max-width: 520px;
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

        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 5px;
        }
        .card-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
          margin-bottom: 28px;
        }

        /* Alert */
        .alert {
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 13px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 9px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.22);
          color: #fca5a5;
          animation: rise 0.3s ease both;
        }

        /* Grid form */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        /* Field */
        .field-group { position: relative; }
        .field-group.col2 { grid-column: 1 / -1; }

        .field-group.focused .field-input {
          border-color: rgba(129,140,248,0.55);
          background: rgba(79,70,229,0.07);
          box-shadow: 0 0 0 3px rgba(79,70,229,0.13);
        }

        .field-wrap { position: relative; }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 11px;
          padding: 13px 15px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          appearance: none;
          -webkit-appearance: none;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.18); }
        .field-input:-webkit-autofill,
        .field-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #111118 inset;
          -webkit-text-fill-color: #fff;
        }
        .field-input.field-disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        /* Select wrapper */
        .select-wrap {
          position: relative;
          grid-column: 1 / -1;
        }
        .select-wrap.half { grid-column: unset; }

        .field-select {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 11px;
          padding: 13px 40px 13px 15px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.7);
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
        }
        .field-select:focus {
          border-color: rgba(129,140,248,0.55);
          background: rgba(79,70,229,0.07);
          box-shadow: 0 0 0 3px rgba(79,70,229,0.13);
          color: #fff;
        }
        .field-select option {
          background: #1a1a2e;
          color: #fff;
        }
        .select-arrow {
          position: absolute;
          right: 13px; top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.3);
          pointer-events: none;
          font-size: 11px;
        }

        /* Password field */
        .pw-wrap { position: relative; grid-column: 1 / -1; }
        .pw-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 11px;
          padding: 13px 44px 13px 15px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          appearance: none;
        }
        .pw-input::placeholder { color: rgba(255,255,255,0.18); }
        .pw-input:focus {
          border-color: rgba(129,140,248,0.55);
          background: rgba(79,70,229,0.07);
          box-shadow: 0 0 0 3px rgba(79,70,229,0.13);
        }
        .pw-input.field-disabled { opacity: 0.35; cursor: not-allowed; }
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

        /* Divider label for student section */
        .section-label {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
        }
        .section-label-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .section-label-text {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          white-space: nowrap;
        }

        /* Submit */
        .btn-submit {
          grid-column: 1 / -1;
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

        @media (max-width: 520px) {
          .card { padding: 36px 22px 32px; }
          .form-grid { grid-template-columns: 1fr; }
          .field-group.col2,
          .select-wrap,
          .pw-wrap,
          .section-label,
          .btn-submit { grid-column: unset; }
          .select-wrap.half { grid-column: unset; }
        }
      `}</style>

      <div className="reg-root">
        <div className="bg-grid" />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />

        <div className="card">
          <div className="logo-wrap">
            <div className="logo-icon">🎓</div>
            <span className="logo-name">AcademiX</span>
          </div>

          <h1 className="card-title">Create account</h1>
          <p className="card-sub">Register with your institutional email</p>

          {error && (
            <div className="alert">
              <span>⚠</span> {error}
            </div>
          )}

          <form className="form-grid" onSubmit={handleSubmit}>
            {/* Name row */}
            <div className={`field-group${focusedField === "firstName" ? " focused" : ""}`}>
              <div className="field-wrap">
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField(null)}
                  className="field-input"
                  placeholder="First Name *"
                />
              </div>
            </div>

            <div className={`field-group${focusedField === "lastName" ? " focused" : ""}`}>
              <div className="field-wrap">
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("lastName")}
                  onBlur={() => setFocusedField(null)}
                  className="field-input"
                  placeholder="Last Name *"
                />
              </div>
            </div>

            {/* Email */}
            <div className={`field-group col2${focusedField === "email" ? " focused" : ""}`}>
              <div className="field-wrap">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="field-input"
                  placeholder="Official Email (example@du.ac.bd) *"
                />
              </div>
            </div>

            {/* Phone */}
            <div className={`field-group col2${focusedField === "phone" ? " focused" : ""}`}>
              <div className="field-wrap">
                <input
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className="field-input"
                  placeholder="Phone Number *"
                />
              </div>
            </div>

            {/* Role */}
            <div className="select-wrap">
              <select
                value={role}
                onChange={(e) => { setRole(e.target.value); setError(""); }}
                className="field-select"
              >
                <option value="">Select Role *</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="staff">Staff</option>
              </select>
              <span className="select-arrow">▼</span>
            </div>

            {/* Student-only fields */}
            {role === "student" && (
              <>
                <div className="section-label">
                  <div className="section-label-line" />
                  <span className="section-label-text">Student Details</span>
                  <div className="section-label-line" />
                </div>

                <div className={`field-group${focusedField === "regNo" ? " focused" : ""}`}>
                  <div className="field-wrap">
                    <input
                      name="regNo"
                      type="text"
                      value={formData.regNo}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("regNo")}
                      onBlur={() => setFocusedField(null)}
                      className="field-input"
                      placeholder="DU Reg. No. (10 digits) *"
                    />
                  </div>
                </div>

                <div className={`field-group${focusedField === "rollNo" ? " focused" : ""}`}>
                  <div className="field-wrap">
                    <input
                      name="rollNo"
                      type="text"
                      value={formData.rollNo}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("rollNo")}
                      onBlur={() => setFocusedField(null)}
                      className="field-input"
                      placeholder="Roll No. (4 digits) *"
                    />
                  </div>
                </div>

                <div className="select-wrap">
                  <select
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    className="field-select"
                  >
                    <option value="">Select Batch *</option>
                    <option value="BSSE 1st Year">BSSE 1st Year</option>
                    <option value="BSSE 2nd Year">BSSE 2nd Year</option>
                    <option value="BSSE 3rd Year">BSSE 3rd Year</option>
                    <option value="BSSE 4th Year">BSSE 4th Year</option>
                    <option value="MSSE 1st Year">MSSE 1st Year</option>
                    <option value="MSSE 2nd Year">MSSE 2nd Year</option>
                  </select>
                  <span className="select-arrow">▼</span>
                </div>
              </>
            )}

            {/* Password */}
            <div className="pw-wrap">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className={`pw-input${!role ? " field-disabled" : ""}`}
                placeholder="Password (8–15 characters) *"
                disabled={!role}
              />
              {role && (
                <span className="pw-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁"}
                </span>
              )}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-submit">
              {isSubmitting && <span className="spinner" />}
              {isSubmitting ? "Submitting..." : "Create Account"}
            </button>
          </form>

          <p className="form-footer">
            Already have an account?{" "}
            <Link to="/login" className="footer-link">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
