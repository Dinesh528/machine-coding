import React, { useState, useRef, useEffect } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(" "));
  const [error, setError] = useState(false);
  const [errmsg, setErrmsg] = useState("");

  const InputRef = useRef([]);

  useEffect(() => {
    if (InputRef.current[0]) {
      InputRef.current[0].focus();
    }
  }, []);

  const handleOtpChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    // allow only one input
    newOtp[index] = value.substring(value.length - 1);

    // check for consecutive numbers
    if (
      index > 0 &&
      parseInt(newOtp[index], 10) - parseInt(newOtp[index - 1]) === 1
    ) {
      setError(true);
      setErrmsg("Please enter unique number");
      return;
    }

    // check for descending numbers
    if (
      index > 0 &&
      parseInt(newOtp[index], 10) - parseInt(newOtp[index - 1]) === -1
    ) {
      setError(true);
      setErrmsg("Please enter unique number");
      return;
    }

    //check for same number
    if (index > 0 && newOtp[index] === newOtp[index - 1]) {
      setError(true);
      setErrmsg("Please enter unique number");
      return;
    }

    setError(false);
    setErrmsg("");
    setOtp(newOtp);

    //submit otp
    const combinedOtp = newOtp.join("");

    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    //move to next input element if current field is filled
    if (value && index < length - 1 && InputRef.current[index + 1]) {
      InputRef.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    InputRef.current[index].setSelectionRange(1, 1);
  };

  // move focus to the previous input field on backspace
  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      InputRef.current[index - 1]
    ) {
      InputRef.current[index - 1].focus();
    }
  };
  return (
    <div>
      {otp.map((otp, index) => {
        return (
          <input
            type="text"
            key={index}
            value={otp}
            ref={(input) => (InputRef.current[index] = input)}
            onChange={(e) => handleOtpChange(index, e)}
            onClick={handleClick}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otp-input"
          />
        );
      })}
      <div style={{ color: "red" }}>{error && errmsg}</div>
    </div>
  );
};

export default OtpInput;
