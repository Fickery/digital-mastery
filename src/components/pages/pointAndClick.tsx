"use client";
import React, { useState, useEffect } from "react";

interface Target {
  id: number;
  x: number;
  y: number;
  width: number; // New property for width
  height: number; // New property for height
  isClicked: boolean;
}

const PointAndClickGame = () => {
  const [score, setScore] = useState<number>(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const gameAreaWidth = 700;
  const gameAreaHeight = 358;

  useEffect(() => {
    const refreshTargets = () => generateTargets();

    if (gameStarted) {
      const intervalId = setInterval(refreshTargets, 3000);
      return () => clearInterval(intervalId);
    } else {
      generateTargets();
    }
  }, [gameStarted]);

  const generateTargets = () => {
    const newTargets: Target[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * gameAreaWidth),
      y: Math.floor(Math.random() * gameAreaHeight),
      width: Math.random() * 20 + 5, // Random width between 5px and 25px
      height: Math.random() * 20 + 5, // Random height between 5px and 25px
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

  const handleStartGame = () => setGameStarted(true);
  const isComplete = score >= 500;

  return (
    <div className="w-full px-[325px] font-urbanist font-bold text-white">
      <div className="relative mx-auto flex h-[28rem] w-[50rem] flex-col items-center justify-center border-[0.5px] border-[#828282] bg-background">
        {!gameStarted && <button onClick={handleStartGame}>Start Game</button>}
        {gameStarted &&
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
        Score: {score}
      </p>
    </div>
  );
};

export default PointAndClickGame;
