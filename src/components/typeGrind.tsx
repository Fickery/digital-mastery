"use client";
import React, { useState, useEffect } from "react";
// import axios from "axios";

const TypeGrind = () => {
  const [sentences, setSentences] = useState([]);
  const [typedSentence, setTypedSentence] = useState("");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [completedSentences, setCompletedSentences] = useState(0);

  //   useEffect(() => {
  //     const fetchSentences = async () => {
  //       const response = await axios.get("/api/random-sentences");
  //       setSentences(response.data.sentences);
  //     };
  //     fetchSentences();
  //   }, []);

  const handleInputChange = (event) => {
    setTypedSentence(event.target.value);
  };

  const handleNextSentence = () => {
    if (typedSentence === sentences[currentSentenceIndex]) {
      setCompletedSentences(completedSentences + 1);
      setCurrentSentenceIndex(currentSentenceIndex + 1);
      setTypedSentence("");
    }
  };

  const isComplete = completedSentences === 100;

  if (isComplete) {
    return (
      <div>
        <h1>Congratulations!</h1>
        <p>You have successfully typed 100 sentences.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-[325px] font-urbanist font-bold text-white">
      <div className="mx-auto h-[28rem] w-[50rem] border-[0.5px] border-[#828282] bg-background text-center">
        <span>{sentences[currentSentenceIndex]}</span>
        <input type="text" value={typedSentence} onChange={handleInputChange} />
        <br />
        <button onClick={handleNextSentence}>Next Sentence</button>
        <br />
      </div>
      <p className="flex justify-center pt-8 font-urbanist font-medium">
        Progress: {completedSentences}/100 sentences completed
      </p>
    </div>
  );
};

export default TypeGrind;
