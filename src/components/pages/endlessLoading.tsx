"use client";
import React, { useState, useEffect } from "react";
import { MoonLoader } from "react-spinners";

const LoadingComponent = () => {
  const storedElapsedTime =
    parseInt(localStorage.getItem("elapsedTime") ?? "") || 0;
  const [elapsedTime, setElapsedTime] = useState(storedElapsedTime);
  const [hasStarted, setHasStarted] = useState(storedElapsedTime > 0);
  const [isActive, setIsActive] = useState(true);

  // time
  const totalDuration = 30 * 60; // 30 minutes in seconds

  const saveElapsedTimeToLocalStorage = () => {
    localStorage.setItem("elapsedTime", elapsedTime.toString());
  };

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
        setElapsedTime((prevElapsedTime) => {
          const newElapsedTime = prevElapsedTime + 1;
          saveElapsedTimeToLocalStorage();
          return newElapsedTime;
        });
      }
    }, 1000);

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(timeUpdate);
    };
  }, [elapsedTime, hasStarted, isActive, totalDuration]);

  useEffect(() => {
    // Clear the stored elapsed time when the component unmounts
    return () => {
      localStorage.removeItem("elapsedTime");
    };
  }, []);

  // if (hasStarted && !isActive) {
  //   alert("Please stay on this page and avoid switching tabs.");
  // }

  return (
    <div className="w-full px-[325px] font-urbanist font-bold text-white">
      <div className="mx-auto flex h-[28rem] w-[50rem] flex-col items-center justify-center border-[0.5px] border-[#828282] bg-background">
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
      {hasStarted ? (
        <p className="flex justify-center pt-8 font-urbanist font-medium">
          {formattedTime} remaining
        </p>
      ) : (
        <p className="flex justify-center pt-8 font-urbanist font-medium">
          Press START to begin
        </p>
      )}
    </div>
  );
};

export default LoadingComponent;
