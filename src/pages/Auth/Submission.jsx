import { CheckCircleIcon } from "@heroicons/react/24/solid"; // Install heroicons: npm install @heroicons/react
import { useNavigate } from "react-router-dom";

export default function Submission() {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate("/login");
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="h-20 w-20 text-green-500" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Thank You!
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-lg mb-6">
          Your information has been successfully submitted. We will send a confirmation email once your account is verified.
        </p>
        
        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
