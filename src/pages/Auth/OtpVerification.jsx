import { useEffect,useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "../../api/authService";

const RESEND_COOLDOWN_SECONDS = 120;

export default function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return undefined;
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpSent) {
    setError("Please send OTP first.");
    return;
  }
    setError("");
    setSuccess("");
    setLoading(true);

    const res = await verifyOtp({ email, otp });
    setLoading(false);
    //e.preventDefault();
    //setError("");

    if (!res.ok) {

      setError(res.message);
      return;
    }

    setSuccess(res.message);
    setTimeout(() => navigate("/login"), 1200);
  };
  const handleResend = async () => {
  if (!email) {
    setError("Please enter your email first.");
    return;
  }

  if (countdown > 0) return;

  setError("");
  setSuccess("");
  setLoading(true);

  const res = await resendOtp(email);

  setLoading(false);

  if (!res.ok) {
    setError(res.message);
    return;
  }

  setSuccess(res.message || "OTP sent successfully.");
  setOtpSent(true);
  setCountdown(RESEND_COOLDOWN_SECONDS);
};

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>

      {error && (
        <p className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
          {error}
        </p>
      )}

      {success && (
        <p className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm">
          {success}
        </p>
      )}

      <div className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded"
          placeholder="Registered email"
          required
        />

        {!otpSent ? (
          <button
            onClick={handleResend}
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-blue-300"
            type="button"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="6-digit OTP"
                required
              />

              <button
                className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-blue-300"
                type="submit"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </form>

            {countdown > 0 ? (
              <p className="text-center text-sm text-gray-600">
                OTP expires in {countdown}s
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={loading}
                className="w-full mt-1 text-sm text-blue-700 disabled:text-gray-400"
                type="button"
              >
                {loading ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </>
        )}
      </div>

      <p className="text-center text-sm mt-4">
        Back to{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          login
        </Link>
      </p>
    </div>
  </div>
);
}