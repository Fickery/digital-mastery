"use client";
import { useEffect, useState } from "react";

export default function EndlessScroll() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  //time
  const totalDuration = 10 * 600; // 10 minutes in seconds

  const remainingTime = totalDuration - elapsedTime;
  const seconds = remainingTime % 60;
  const minutes = Math.floor(remainingTime / 60) % 60;
  const hours = Math.floor(remainingTime / 3600);

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  useEffect(() => {
    setInterval(() => {
      if (elapsedTime < totalDuration) {
        setElapsedTime((prevElapsedTime) => {
          const newElapsedTime = prevElapsedTime + 1;
          return newElapsedTime;
        });
      }
    }, 1000);
  }, [isScrolling, elapsedTime]);

  const handleScroll = () => {
    setIsScrolling(true);
  };

  const handleStopScroll = () => {
    setIsScrolling(false);
  };

  const handleScrollArea = (e) => {
    if (isScrolling) {
      const scrollPercentage =
        (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)) *
        100;

      // Update the elapsed time based on the scroll percentage
      setElapsedTime(Math.floor((scrollPercentage / 100) * 600));
    }
  };

  const progPercent = Math.min(elapsedTime / 600, 1) * 100;

  return (
    <>
      <div className="w-full px-[325px] font-urbanist font-bold text-white">
        <div className="relative mx-auto h-[28rem] w-[50rem] border-[0.5px] border-[#828282] bg-background text-center">
          <div
            className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
            onMouseDown={handleScroll}
            onMouseUp={handleStopScroll}
            onMouseLeave={handleStopScroll}
            onScroll={handleScrollArea} // Added onScroll event handler
          >
            <p>Scroll here</p>
          </div>
        </div>
        <p className="flex justify-center pt-8 font-urbanist font-medium">
          You have scrolled {formattedTime} minutes
        </p>
      </div>
    </>
  );
}
