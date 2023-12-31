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
    <div className="w-full font-urbanist font-bold text-white sm:px-[225px] xl:px-[325px]">
      <div className="mx-auto flex h-[28rem] flex-col items-center justify-center border-[0.5px] border-[#828282] bg-background sm:w-full xl:w-[50rem]">
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
