"use client";
"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { faker } from "@faker-js/faker";

export default function TypeGrind() {
  const [hasStarted, setHasStarted] = useState(false);
  const [text, setText] = useState("");
  const [words, setWords] = useState("");
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef(null);

  const genRandomWords = () => {
    const randomWords = faker.random.words({ min: 12, max: 15 });
    setWords(randomWords);
    setText("");
  };

  const startType = () => {
    genRandomWords();
    setHasStarted(true);
    setProgress(0);
    setCompleted(false);
  };

  const nextSentence = () => {
    if (text.trim() === words) {
      genRandomWords();
      setProgress((prevProg) => {
        if (prevProg === 24) {
          setCompleted(true);
          return prevProg;
        }
        return prevProg + 1;
      });
    }
  };

  useEffect(() => {
    if (hasStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasStarted]);

  if (!hasStarted)
    return (
      <div className="w-full px-[325px] font-urbanist font-bold text-white">
        <div className="mx-auto flex h-[28rem] w-[50rem] flex-col items-center justify-center border-[0.5px] border-[#828282] bg-background">
          <Button onClick={startType}>Start</Button>
        </div>
        <p className="flex justify-center pt-8 font-urbanist font-medium">
          Press START to begin
        </p>
      </div>
    );

  return (
    <div className="w-full px-[325px] font-urbanist font-bold text-white">
      <div className="mx-auto flex h-[28rem] w-[50rem] flex-col items-center justify-around border-[0.5px] border-[#828282] bg-background">
        <p className="px-12 text-center text-xl font-medium tracking-wider text-[#5F5F5F]">
          {words}
        </p>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-lg border px-4 py-2"
          placeholder="Start typing..."
        />
        <Button onClick={nextSentence}>Next Sentence</Button>
      </div>
      <p className="flex justify-center pt-8 font-urbanist font-medium">
        {progress} / 25 sentences completed
      </p>
      {completed && (
        <p className="flex justify-center pt-8 font-urbanist font-medium">
          Congratulations! You've completed the typing test.
        </p>
      )}
    </div>
  );
}
