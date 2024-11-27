import React, { useState, useRef } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = (otp) => console.log(otp) }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    // Validate input (only allow digits)
    if (!/^[0-9]$/.test(value) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if the current input is filled
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // Call the onOtpSubmit callback when all inputs are filled
    if (newOtp.every((digit) => digit !== "")) {
      onOtpSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Move to the previous input if Backspace is pressed and the current input is empty
      if (index > 0 && !otp[index]) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);

    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      if (i < length) {
        newOtp[i] = pasteData[i];
      }
    }
    setOtp(newOtp);

    // Move to the appropriate input based on the paste length
    const filledIndex = Math.min(pasteData.length, length) - 1;
    if (filledIndex < length) {
      inputsRef.current[filledIndex].focus();
    }

    // Call the onOtpSubmit callback if all inputs are filled
    if (newOtp.every((digit) => digit !== "")) {
      onOtpSubmit(newOtp.join(""));
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputsRef.current[index] = el)} // Store each input in the ref array
          style={{
            width: "50px",
            height: "50px",
            fontSize: "20px",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
