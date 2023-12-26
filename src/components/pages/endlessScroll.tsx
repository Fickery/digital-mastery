"use client";
import React, { useEffect, useState } from "react";
import "./EndlessScroll.css";

export default function EndlessScroll() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const targetDiv = document.getElementById("target");

      if (targetDiv) {
        const scrollY = targetDiv.scrollTop;
        const scrollHeight = targetDiv.scrollHeight;
        const clientHeight = targetDiv.clientHeight;

        const scrollPercentage =
          (scrollY / (scrollHeight - clientHeight)) * 100;

        setScrollPercentage(scrollPercentage);
      }
    };

    const targetDiv = document.getElementById("target");

    if (targetDiv) {
      targetDiv.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (targetDiv) {
        targetDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex w-full flex-col overflow-hidden px-[325px] font-urbanist font-bold text-white">
      <div className="mx-auto flex h-[28rem] w-[50rem] flex-col items-center justify-around border-[0.5px] border-[#828282] bg-background">
        <div id="target" className="custom-scrollbar">
          <div className="z-50 flex h-[20000vh] w-screen justify-center p-4 font-urbanist font-medium">
            <div className="fixed top-[55%] flex cursor-default items-center justify-center">
              {scrollPercentage >= 95 ? (
                <>Just keep scrolling!</>
              ) : scrollPercentage >= 50 ? (
                <>Almost there!</>
              ) : (
                <>Scroll to start!</>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="flex justify-center pt-8 font-urbanist font-medium">
        Scroll Percentage: {scrollPercentage.toFixed(2)}%
      </p>
    </div>
  );
}
