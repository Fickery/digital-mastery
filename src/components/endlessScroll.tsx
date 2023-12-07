"use client";
import { useEffect, useState } from "react";

export default function EndlessScroll() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (isScrolling) {
        setElapsedTime((elapsedTime) => elapsedTime + 1);
      }
    }, 1000);

    return () => clearInterval(scrollInterval);
  }, [isScrolling, elapsedTime]);

  const handleScroll = () => {
    setIsScrolling(true);
  };

  const handleStopScroll = () => {
    setIsScrolling(false);
  };

  const handleScrollArea = (e) => {
    if (isScrolling) {
      // Calculate the scroll percentage based on scroll position
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
        <div className="mx-auto h-[28rem] w-[50rem] border-[0.5px] border-[#828282] bg-background text-center">
          <div className="relative h-2 bg-foreground">
            <div
              className="absolute right-0 bg-primary"
              style={{ width: `${progPercent}%` }}
            ></div>
          </div>
          <div
            className="scroll-area"
            onMouseDown={handleScroll}
            onMouseUp={handleStopScroll}
            onMouseLeave={handleStopScroll}
            onScroll={handleScrollArea} // Added onScroll event handler
          ></div>
        </div>
        <p className="flex justify-center pt-8 font-urbanist font-medium">
          You have scrolled {Math.floor(elapsedTime / 60)} minutes
        </p>
      </div>
    </>
  );
}
