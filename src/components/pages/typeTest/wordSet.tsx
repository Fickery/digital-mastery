import { RefCallback } from "react";
import Word from "./word";

type Props = {
  wordList: string[];
  typedWordList: string[];
  activeWordIndex: number;
  wordRef: RefCallback<HTMLDivElement>;
};

const WordSet = ({
  wordList,
  typedWordList,
  activeWordIndex,
  wordRef,
}: Props) => {
  const componentList = wordList.map((word, i) => {
    let wordStatus = "passive";

    if (activeWordIndex === i) {
      wordStatus = "active";
    } else if (activeWordIndex > i) {
      if (typedWordList[i] != word) wordStatus = "incorrect";
      else wordStatus = "done";
    }
    return (
      <Word
        word={word}
        typedWord={typedWordList[i]}
        wordRef={wordRef}
        status={wordStatus}
        key={word + i}
      />
    );
  });

  return (
    <div className="mx-auto flex flex-wrap justify-center px-4 tracking-wide">
      {componentList}
    </div>
  );
};

export default WordSet;
