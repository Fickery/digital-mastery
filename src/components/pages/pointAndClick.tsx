"use client";
import React, { useState, useEffect } from "react";

const PointAndClickGame = () => {
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const gameAreaWidth = 500;
  const gameAreaHeight = 280;

  useEffect(() => {
    const generateTargets = () => {
      const newTargets = [];
      for (let i = 0; i < 10; i++) {
        newTargets.push({
          id: i,
          x: Math.floor(Math.random() * gameAreaWidth),
          y: Math.floor(Math.random() * gameAreaHeight),
          isClicked: false,
          image: getRandomImage(), // Function to generate random image URL
        });
      }
      setTargets(newTargets);
    };

    const refreshTargets = () => {
      generateTargets();
    };

    if (!gameStarted) {
      generateTargets();
    } else {
      const intervalId = setInterval(refreshTargets, 1000); // Refresh targets every 5 seconds
      return () => clearInterval(intervalId);
    }
  }, [gameStarted]);

  const getRandomImage = () => {
    // Implement logic to generate random image URL based on your requirements
    // Example: return `https://unsplash.com/photos/${Math.random().toString(36).substring(2, 15)}/download`;
    return "";
  };

  const handleClick = (targetId) => {
    setTargets((prevTargets) =>
      prevTargets.map((target) => {
        if (target.id === targetId) {
          return { ...target, isClicked: true };
        }
        return target;
      }),
    );
    setScore(score + 1);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const isComplete = score >= 500;

  if (isComplete) {
    return (
      <div>
        <h1>Congratulations!</h1>
        <p>You have reached 500 points and completed the game!</p>
      </div>
    );
  }

  return (
    <div className="w-full px-[325px] font-urbanist font-bold text-white">
      <div className="relative mx-auto h-[28rem] w-[50rem] border-[0.5px] border-[#828282] bg-background text-center">
        {!gameStarted && <button onClick={handleStartGame}>Start Game</button>}
        {gameStarted && (
          <div>
            <div className="h-12 w-12">
              {targets.map((target) => (
                <div
                  key={target.id}
                  style={{
                    position: "absolute",
                    left: target.x,
                    top: target.y,
                    width: "5px",
                    height: "5px",
                    background: target.image ? `url(${target.image})` : "red",
                    backgroundSize: "cover",
                  }}
                  onClick={() => handleClick(target.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <p className="flex justify-center pt-8 font-urbanist font-medium">
        Score: {score}
      </p>
    </div>
  );
};

export default PointAndClickGame;
