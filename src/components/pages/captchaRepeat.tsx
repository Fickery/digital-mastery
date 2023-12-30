"use client";
import React, { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const RecaptchaV2Page = () => {
  const [counter, setCounter] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [tasksCompleted, setTasksCompleted] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onReCAPTCHAChange = (token: string | null) => {
    if (token) {
      const newCount = counter + 1;
      setCounter(newCount);
      if (newCount === 3) {
        setIsCompleted(true);
      } else {
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }
    }
  };

  useEffect(() => {
    if (isCompleted) {
      setTasksCompleted(true);
      localStorage.setItem("taskCompleted", "true");
      localStorage.setItem("taskCompleted-Captcha Repeater", "true");
      localStorage.setItem("lastCompletedDate", new Date().toDateString());
      window.location.href = "home";
    }
  });

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
        Challenge {counter} of 3
      </p>
    </div>
  );
};

export default RecaptchaV2Page;

