"use client";
import React, { useState, useEffect } from "react";

const CaptchaChallenge = () => {
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleCaptchaSuccess = () => {
    setAttempts(attempts + 1);
    if (attempts >= 25) {
      setCompleted(true);
    }
  };

  const handleCaptchaError = () => {
    // You can implement logic to handle errors here, e.g., showing an error message or offering retry options.
  };

  if (completed) {
    return (
      <div>
        <h1>Congratulations!</h1>
        <p>You have successfully solved the CAPTCHA 25 times.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-[325px] font-urbanist font-bold text-white">
      <div className="mx-auto h-[28rem] w-[50rem] border-[0.5px] border-[#828282] bg-background text-center">
        <div>
          {/* <ReCAPTCHAv3
          sitekey="YOUR_SITE_KEY"
          action="verify"
          size="compact"
          onVerify={handleCaptchaSuccess}
          onError={handleCaptchaError}
        /> */}
        </div>
      </div>
      <p className="flex justify-center pt-8 font-urbanist font-medium">
        Attempts remaining: {25 - attempts}
      </p>
    </div>
  );
};

export default CaptchaChallenge;
