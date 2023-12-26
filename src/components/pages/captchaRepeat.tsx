"use client";
import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const RecaptchaV2Page = () => {
  const [counter, setCounter] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onReCAPTCHAChange = (token: string | null) => {
    if (token) {
      const newCount = counter + 1;
      setCounter(newCount);
      if (newCount >= 25) {
        setIsCompleted(true);
      } else {
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }
    }
  };

  return (
    <div className="w-full px-[325px] font-urbanist font-bold text-white">
      <div className="mx-auto flex h-[28rem] w-[50rem] flex-col items-center justify-around border-[0.5px] border-[#828282] bg-background">
        {isCompleted ? (
          <div>Thank you for completing the challenges!</div>
        ) : (
          <div>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LfPODEpAAAAAO9t_90mJ7CY6l_zyHwlmtvoluEv"
              onChange={onReCAPTCHAChange}
            />
          </div>
        )}
      </div>
      <p className="flex justify-center pt-8 font-urbanist font-medium">
        Challenge {counter + 1} of 25
      </p>
    </div>
  );
};

export default RecaptchaV2Page;
