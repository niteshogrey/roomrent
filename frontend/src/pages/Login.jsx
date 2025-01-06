import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [step, setStep] = useState(1); // Tracks the current step
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();

  console.log(userExists)
  // Handle sending OTP
  const handleSendOtp = async () => {
    if (!phoneNumber) return alert("Please enter a phone number.");
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/api/v1/user/send-otp", { phoneNumber });
      alert("OTP sent successfully!");
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle verifying OTP
  const handleVerifyOtp = async () => {
    if (!otp) return alert("Please enter the OTP.");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/verify", {
        phoneNumber,
        code: otp,
      });

      if (response.data.userExists) {
        // User exists; login
        alert("Login successful!");
        console.log(response.data.token);
        console.log(response.data.username);  

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);

        navigate("/");
      } else {
        // New user; go to username step
        setUserExists(false);
        setStep(3);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle completing registration
  const handleCompleteRegistration = async () => {
    if (!username) return alert("Please enter a username.");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/register", {
        phoneNumber,
        username,
      });

      alert("Registration successful!");
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Error completing registration:", error);
      alert("Failed to complete registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {step === 1 && "Enter Phone Number"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Complete Registration"}
        </h1>

        {step === 1 && (
          <div>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border p-3 rounded mb-4"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border p-3 rounded mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-3 rounded mb-4"
            />
            <button
              onClick={handleCompleteRegistration}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {loading ? "Registering..." : "Complete Registration"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
