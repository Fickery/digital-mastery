"use client";
import React, { useState, useEffect } from "react";
import { MoonLoader } from "react-spinners";

const LoadingComponent = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // time
  const totalDuration = 30 * 60; // 30 minutes in seconds
  const remainingTime = totalDuration - elapsedTime;

  const seconds = remainingTime % 60;
  const minutes = Math.floor(remainingTime / 60) % 60;
  const hours = Math.floor(remainingTime / 3600);

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    };

    const timeUpdate = setInterval(() => {
      if (hasStarted && isActive && elapsedTime < totalDuration) {
        setElapsedTime((elapsedTime) => elapsedTime + 1);
      }
    }, 1000);

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(timeUpdate);
    };
  }, [elapsedTime, hasStarted, isActive, totalDuration]);

  // if (hasStarted && !isActive) {
  //   alert("Please stay on this page and avoid switching tabs.");
  // }

  return (
    <div className="w-full px-[325px] font-urbanist font-bold text-white">
      <div className="mx-auto flex h-[28rem] w-[50rem] flex-col items-center justify-center border-[0.5px] border-[#828282] bg-background text-center">
        {hasStarted && elapsedTime >= totalDuration ? (
          <h1>Loading complete!</h1>
        ) : (
          <>
            {hasStarted ? (
              <>
                <MoonLoader
                  color="#828282"
                  speedMultiplier={0.1}
                  className="pb-8"
                />
                <p className="text-md animate-pulse pt-12 font-thin tracking-widest">
                  Please stay on this page and avoid switching tabs.
                </p>
              </>
            ) : (
              <button onClick={() => setHasStarted(true)}>START</button>
            )}
          </>
        )}
      </div>
      <p className="flex justify-center pt-8 font-urbanist font-medium">
        {formattedTime} remaining
      </p>
    </div>
  );
};

export default LoadingComponent;
