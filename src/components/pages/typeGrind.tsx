"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import WordSet from "./typeTest/wordSet";
import wordList from "../../../wordlist.json";

const Home: NextPage = () => {
  const [counter, setCounter] = useState(0);
  const [typedWordList, setTypedWordList] = useState<string[]>([""]);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [wordSet, setWordSet] = useState<string[]>([]);

  const wordRef = useCallback((node: HTMLDivElement) => {
    if (node === null) return;
    node.scrollIntoView({
      block: "center",
    });
  }, []);

  const main = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const typed = event.target.value;
    setTypedWordList(typed.split(" "));
  };

  const reset = () => {
    setTypedWordList([""]);
    setActiveWordIndex(0);
    main.current ? (main.current.value = "") : null;
    main.current?.focus();
  };

  const newSet = () => {
    const wordSetSize = 3;
    setWordSet(wordList.sort(() => Math.random() - 0.5).slice(0, wordSetSize));
    reset();
  };

  useEffect(() => {
    if (typedWordList.length > wordSet.length) reset();
    else setActiveWordIndex(typedWordList.length - 1);
  }, [typedWordList, wordSet]);

  useEffect(() => newSet(), []);

  useEffect(() => {
    const isCompletedCorrectly = wordSet.every(
      (word, index) => word === typedWordList[index],
    );

    if (isCompletedCorrectly) {
      newSet();
    }

    if (isCompletedCorrectly) {
      setCounter(counter + 1);
      console.log("completed");
    }
  }, [typedWordList, wordSet]);

  return (
    <div className="w-full px-[325px] font-urbanist font-bold text-white">
      <div className="mx-auto flex h-[28rem] w-[50rem] flex-col items-center justify-center border-[0.5px] border-[#828282] bg-background">
        <div
          className="flex h-full flex-col justify-center focus:outline-none"
          onFocus={() => main.current?.focus()}
          tabIndex={1}
        >
          <div title="typing test">
            <input
              className="absolute z-[-1] opacity-0"
              ref={main}
              onChange={handleKeyPress}
              autoFocus
              autoCapitalize="off"
            ></input>
            <WordSet
              wordList={wordSet.slice(0, activeWordIndex + 50)}
              typedWordList={typedWordList}
              activeWordIndex={activeWordIndex}
              wordRef={wordRef}
            />
          </div>
        </div>
      </div>
      <p className="flex justify-center pt-8 font-urbanist font-medium">
        {counter} / 20
      </p>
    </div>
  );
};

export default Home;
