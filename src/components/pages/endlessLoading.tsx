"use client";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

//*****-------------------------------------------------------------------------*****//

const TOTAL_DURATION = 5;

const LoadingComponent = () => {
  const [elapsedTime, setElapsedTime] = useState(() => getInitialElapsedTime());
  const [hasStarted, setHasStarted] = useState(elapsedTime > 0);
  const [isActive, setIsActive] = useState(true);
  const [timerFinished, setTimerFinished] = useState(false);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  // Fetch initial elapsed time from local storage or default to 0
  function getInitialElapsedTime() {
    const storedTime = localStorage.getItem("elapsedTime");
    return storedTime ? parseInt(storedTime, 10) : 0;
  }

  function formatTime(timeInSeconds: number) {
    const seconds = timeInSeconds % 60;
    const minutes = Math.floor(timeInSeconds / 60) % 60;
    const hours = Math.floor(timeInSeconds / 3600);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  //*****-----------------------------------------------------------------------*****//

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (hasStarted && isActive && elapsedTime < TOTAL_DURATION) {
      intervalId = setInterval(() => {
        setElapsedTime((prevTime) => {
          const newTime = prevTime + 1;
          localStorage.setItem("elapsedTime", newTime.toString());
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [hasStarted, isActive, elapsedTime]);

  useEffect(() => {
    const handleVisibilityChange = () => setIsActive(!document.hidden);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      window.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (elapsedTime >= TOTAL_DURATION) {
      setTimerFinished(true);
    }
  }, [elapsedTime, setTimerFinished]);

  useEffect(() => {
    if (timerFinished) {
      setTasksCompleted((prev) => prev + 1);
    }
  }, [timerFinished, setTasksCompleted]);

  // Clear local storage when component unmounts
  useEffect(() => {
    return () => localStorage.removeItem("elapsedTime");
  }, []);

  const remainingTime = TOTAL_DURATION - elapsedTime;
  const formattedTime = formatTime(remainingTime);

  const startTimer = () => setHasStarted(true);

  //*****-----------------------------------------------------------------------*****//

  return (
    <div className="w-full px-[325px] font-urbanist font-bold text-white">
      <div className="mx-auto flex h-[28rem] w-[50rem] flex-col items-center justify-center border-[0.5px] border-[#828282] bg-background">
        {hasStarted && elapsedTime >= TOTAL_DURATION ? (
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
              <button onClick={startTimer}>START</button>
            )}
          </>
        )}
      </div>
      <p className="flex justify-center pt-8 font-urbanist font-medium">
        {hasStarted
          ? elapsedTime < TOTAL_DURATION
            ? formattedTime + " remaining"
            : "Done"
          : "Press start to begin"}
      </p>
      <p className="flex justify-center pt-5">{tasksCompleted}</p>
    </div>
  );
};

export default LoadingComponent;
