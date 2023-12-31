"use client";
import React, { useState, useEffect } from "react";

interface Target {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isClicked: boolean;
}

const PointAndClickGame = () => {
  const [score, setScore] = useState<number>(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const [tasksCompleted, setTasksCompleted] = useState(false);

  const gameAreaWidth = 700;
  const gameAreaHeight = 358;

  useEffect(() => {
    if (score >= 5) {
      setTasksCompleted(true);
      localStorage.setItem("taskCompleted", "true");
      localStorage.setItem("taskCompleted-Point And Click", "true");
      localStorage.setItem("lastCompletedDate", new Date().toDateString());
      window.location.href = "home";
    }
  });

  useEffect(() => {
    const refreshTargets = () => generateTargets();

    if (start) {
      const intervalId = setInterval(refreshTargets, 3000);
      return () => clearInterval(intervalId);
    } else {
      generateTargets();
    }
  }, [start]);

  const generateTargets = () => {
    const newTargets: Target[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * gameAreaWidth),
      y: Math.floor(Math.random() * gameAreaHeight),
      width: Math.random() * 20 + 5,
      height: Math.random() * 20 + 5,
      isClicked: false,
    }));
    setTargets(newTargets);
  };

  const handleClick = (targetId: number) => {
    setTargets((prevTargets) =>
      prevTargets.map((target) =>
        target.id === targetId ? { ...target, isClicked: true } : target,
      ),
    );
    setScore((prevScore) => prevScore + 1);
  };

  const handleStartGame = () => setStart(true);

  return (
    <div className="w-full font-urbanist font-bold text-white sm:px-[50px] xl:px-[325px]">
      <div className="relative mx-auto flex h-[28rem] flex-col items-center justify-center border-[0.5px] border-[#828282] bg-background sm:w-full xl:w-[50rem]">
        {!start && <button onClick={handleStartGame}>Start Game</button>}
        {start &&
          targets.map(
            (target) =>
              !target.isClicked && (
                <div
                  key={target.id}
                  style={{
                    position: "absolute",
                    left: target.x,
                    top: target.y,
                    width: `${target.width}px`,
                    height: `${target.height}px`,
                    background: "red",
                    backgroundSize: "cover",
                  }}
                  onClick={() => handleClick(target.id)}
                />
              ),
          )}
      </div>
      <p className="flex justify-center pt-8 font-urbanist font-medium">
        {score} / 5
      </p>
    </div>
  );
};

export default PointAndClickGame;
