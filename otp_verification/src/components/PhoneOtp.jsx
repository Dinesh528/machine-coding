import React from "react";
import { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtp = () => {
  const [mobile, setMobile] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;

    // allow only 10 digits
    if (value.length > 0 && value.length <= 10) {
      setMobile(e.target.value);
    } else {
      alert("Please enter 10 digits only");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //use regex for validation of mobile numbers
    const regex = /[^0-9\s]/g;
    if (mobile.length < 10 || regex.test(mobile)) {
      alert("Invalid mobile number");
      return;
    }

    //show otp Input
    setShowOtpInput(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!showOtpInput ? (
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <label style={{ margin: "20px", color: "blue" }}>
            Enter Your Mobile Number
          </label>
          <div>
            <input
              type="text"
              value={mobile}
              onChange={handleInputChange}
              style={{ padding: "10px", margin: "1rem" }}
            />
          </div>
          <div>
            <button
              type="submit"
              style={{
                padding: "10px",
                margin: "auto",
                width: "100px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "blue" }}>
            Enter OTP sent to Mobile Number {mobile}
          </p>

          <OtpInput
            length={4}
            onOtpSubmit={() => console.log("login success")}
          />
        </div>
      )}
    </div>
  );
};

export default PhoneOtp;
