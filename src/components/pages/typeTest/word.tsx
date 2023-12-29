import React from "react";
import { RefCallback } from "react";
import Letter from "./letter";

type Props = {
  word: string;
  typedWord: string;
  wordRef: RefCallback<HTMLDivElement>;
  status: string;
  onTypeError?: () => void; // Callback when the word is typed incorrectly
  onCorrectlyTyped?: () => void; // Callback when the word is correctly typed
  onIncorrectlyTyped?: () => void; // Callback when the word is incorrectly typed
};

const Word = ({
  word,
  typedWord = "",
  wordRef,
  status,
  onCorrectlyTyped,
  onIncorrectlyTyped,
}: Props) => {
  let isCurrentWordCorrect = true;

  const componentList = word.split("").map((char, i) => {
    let letterStatus = "waiting";

    if (status === "active") {
      letterStatus = "active";
    }

    if (typedWord.charAt(i) === char) {
      letterStatus = "correct";
    } else if (typedWord.charAt(i) !== "") {
      letterStatus = "incorrect";
      isCurrentWordCorrect = false;
    }

    return <Letter char={char} status={letterStatus} key={i} />;
  });

  const suffix =
    typedWord.length > word.length ? typedWord.slice(word.length) : "";

  // When the word is fully and correctly typed, invoke the callback
  if (typedWord === word && isCurrentWordCorrect) {
    onCorrectlyTyped?.();
  } else if (!isCurrentWordCorrect) {
    onIncorrectlyTyped?.(); // Invoke callback when the word is incorrectly typed
    // alert("Incorrect");
  }

  return (
    <div
      className={`m-1 flex border-b border-transparent ${
        status === "active" ? "relative bg-[#3f3f3f]" : ""
      } ${status === "done" ? "opacity-100" : ""}`}
      ref={status === "active" ? wordRef : null}
    >
      {componentList}
      {suffix.split("").map((char, i) => (
        <Letter char={char} status="incorrect" key={`s${i}`} />
      ))}
    </div>
  );
};

export default React.memo(Word);
