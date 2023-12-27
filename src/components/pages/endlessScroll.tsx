"use client";
import React, { useEffect, useState } from "react";
import "./EndlessScroll.css";
import { Button } from "../ui/button";

export default function EndlessScroll() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const targetDiv = document.getElementById("target");

      if (targetDiv && scrollPercentage < 100) {
        const scrollY = targetDiv.scrollTop;
        const scrollHeight = targetDiv.scrollHeight;
        const clientHeight = targetDiv.clientHeight;

        const scrollSpace = (scrollY / (scrollHeight - clientHeight)) * 100;

        setScrollPercentage(scrollSpace);
      }
    };

    const targetDiv = document.getElementById("target");

    if (targetDiv && scrollPercentage < 100) {
      targetDiv.addEventListener("scroll", handleScroll);
    } else if (targetDiv && scrollPercentage >= 100) {
      targetDiv.removeEventListener("scroll", handleScroll);
    }

    if (scrollPercentage >= 100) {
      setTasksCompleted(true);
      localStorage.setItem("taskCompleted", "true");
      localStorage.setItem("taskCompleted-Endless Scroll", "true");
      localStorage.setItem("lastCompletedDate", new Date().toDateString());
      window.location.href = "home";
    }

    return () => {
      if (targetDiv) {
        targetDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollPercentage]);

  return (
    <div className="flex w-full flex-col overflow-hidden px-[325px] font-urbanist font-bold text-white">
      <div className="mx-auto flex h-[28rem] w-[50rem] flex-col items-center justify-around border-[0.5px] border-[#828282] bg-background">
        <div id="target" className="custom-scrollbar">
          <div className="z-50 flex h-[250vh] w-screen justify-center p-4 font-urbanist font-medium">
            <div className="fixed top-[55%] flex cursor-default items-center justify-center">
              {scrollPercentage === 100 ? (
                <>Woop!</>
              ) : scrollPercentage >= 92 ? (
                <>To the finish line!</>
              ) : scrollPercentage >= 50 ? (
                <>Almost there!</>
              ) : scrollPercentage > 0.001 ? (
                <>Just keep scrolling!</>
              ) : (
                scrollPercentage === 0 && <>Scroll here to start!</>
              )}
            </div>
          </div>
        </div>
      </div>
      {scrollPercentage >= 100 ? (
        <p>woo!</p>
      ) : (
        <p className="flex justify-center pt-8 font-urbanist font-medium">
          Scroll Percentage: {scrollPercentage.toFixed(2)}%
        </p>
      )}
    </div>
  );
}

// <Button className="mx-auto flex" onClick={completeTask}>
//   Complete Task
// </Button>

// const canCompleteTask = () => {
//   const lastCompleted = localStorage.getItem("lastCompletedDate");
//   const today = new Date().toDateString();

//   return lastCompleted !== today;
// };

// const completeTask = () => {
//   if (canCompleteTask()) {
//     setTasksCompleted(true);
//     localStorage.setItem("taskCompleted", "true");
//     localStorage.setItem("taskCompleted-Endless Loading", "true");
//     localStorage.setItem("lastCompletedDate", new Date().toDateString());
//     window.location.href = "home";
//   } else {
//     alert("Task can only be completed once per day.");
//   }
// };
