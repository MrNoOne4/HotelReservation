"use client";
"use strict";

import { useState, useEffect, useRef } from "react";

export default function OTPGenerator () {
  const [otp, setOtp] = useState("Click 'Generate OTP' to get a code");
  const [timeLeft, setTimeLeft] = useState(0);
  const [availability, setAvailability] = useState<boolean>(false);
  const [experiment, setExperiment] = useState("");
  const time = useRef<number | null>(null);

  useEffect(() => {
    if (timeLeft < 0) {
      return;
    };
    
     const timerId = setTimeout(() => {
      setTimeLeft(timeLeft => timeLeft - 1);
      time.current = timeLeft;
      setExperiment(time.current > 0 ? "Expires in " + time.current + " seconds" : "OTP expired. Click the button to generate a new OTP.");

    },1000)

    return () => {
      clearTimeout(timerId);
    }
  }, [timeLeft])

   const generateOTP = () => {
    setTimeLeft(5);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(newOtp);
   }


  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-black bg-white ">
      <h1 id="otp-title">OTP Generator</h1>
      <h2 id="otp-display">{otp}</h2>
      <p id="otp-timer" aria-live="assertive">
        {experiment}
      </p>
      <button id="generate-otp-button"  className={`${timeLeft > 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={timeLeft > 0} onClick={generateOTP}>Generate OTP</button>
    </div>
  )
}