"use client";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { Button } from "../ui/button";

//*****-------------------------------------------------------------------------*****//

const TOTAL_DURATION = 3;

const LoadingComponent = () => {
  const [elapsedTime, setElapsedTime] = useState(() => getInitialElapsedTime());
  const [hasStarted, setHasStarted] = useState(elapsedTime > 0);
  const [isActive, setIsActive] = useState(true);
  const [tasksCompleted, setTasksCompleted] = useState(false);

  const resetCompletionDay = () => {
    localStorage.removeItem("lastCompletedDate");
    alert("Completion day reset. You can complete the task again.");
  };

  const canCompleteTask = () => {
    const lastCompleted = localStorage.getItem("lastCompletedDate");
    const today = new Date().toDateString();

    return lastCompleted !== today;
  };

  const completeTask = () => {
    if (canCompleteTask()) {
      setTasksCompleted(true);
      localStorage.setItem("taskCompleted", "true");
      localStorage.setItem("taskCompleted-Endless Loading", "true");
      localStorage.setItem("lastCompletedDate", new Date().toDateString());
      window.location.href = "home";
    } else {
      alert("Task can only be completed once per day.");
    }
  };

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

  const remainingTime = TOTAL_DURATION - elapsedTime;
  const formattedTime = formatTime(remainingTime);

  const startTimer = () => setHasStarted(true);

  //*****-----------------------------------------------------------------------*****//

  useEffect(() => {
    const storedCompleted = localStorage.getItem("taskCompleted");
    if (storedCompleted === "true") {
      setTasksCompleted(true);
    }
  }, []);

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
    return () => localStorage.removeItem("elapsedTime");
  }, []);

  //*****-----------------------------------------------------------------------*****//

  return (
    <div className="w-full font-urbanist font-bold text-white sm:px-[225px] xl:px-[325px]">
      <div className="mx-auto flex h-[28rem] flex-col items-center justify-center border-[0.5px] border-[#828282] bg-background sm:w-full xl:w-[50rem]">
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
        {hasStarted ? (
          elapsedTime < TOTAL_DURATION ? (
            formattedTime + " remaining"
          ) : (
            <Button className="mx-auto flex" onClick={completeTask}>
              Complete Task
            </Button>
          )
        ) : (
          "Press start to begin"
        )}
      </p>
      <Button className="mx-auto flex" onClick={resetCompletionDay}>
        Dev Reset Day
      </Button>
    </div>
  );
};

export default LoadingComponent;
