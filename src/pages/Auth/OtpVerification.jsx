import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "../../api/authService";

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
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    if(countdown > 0)
      return;
    setError("");
    setSuccess("");
    setLoading(true);

    const res = await sendOtp({ email, purpose: "register" });

    setLoading(false);

    if (!res.ok) {
      setError(res.message || "Failed to send OTP.");
      setOtpSent(false);
      return;
    }

    setSuccess(
      res.message || "OTP sent successfully. Please check your email.",
    );
    setOtpSent(true);
    setCountdown(RESEND_COOLDOWN_SECONDS);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      setError("Email and OTP are required.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    const res = await verifyOtp({ email, otp, purpose : "register" });

    setLoading(false);

    if (!res.ok) {
      setError(res.message || "OTP verification failed.");
      return;
    }

    setSuccess(res.message || "OTP verified successfully.");
    setTimeout(() => navigate("/login"), 1200);
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

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Registered email"
            required
            disabled
          />

          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <>
              <form className="space-y-4" onSubmit={handleVerifyOtp}>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 border rounded"
                  placeholder="Enter OTP"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>

              {countdown > 0 ? (
                <p className="text-center text-sm text-gray-600">
                  You can resend OTP in{" "}
                  <span className="font-semibold">{countdown}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full bg-gray-200 text-gray-800 p-3 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
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
