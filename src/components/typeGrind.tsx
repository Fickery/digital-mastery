"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { faker } from "@faker-js/faker";

export default function TypeGrind() {
  const [hasStarted, setHasStarted] = useState(false);
  const [text, setText] = useState("");
  const [words, setWords] = useState("");
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const genRandomWords = () => {
    const randomWords = faker.random.words({ min: 12, max: 15 });
    setWords(randomWords);
  };

  const startType = () => {
    genRandomWords();
    setHasStarted(true);
    setProgress(0);
    setCompleted(false);
  };

  const nextSentence = () => {
    genRandomWords();
    setProgress((prevProg) => {
      if (prevProg === 25) {
        setCompleted(true);
        return prevProg;
      }
      return prevProg + 1;
    });
  };

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
        <Button onClick={nextSentence}>Next Sentence</Button>
      </div>
      <p className="flex justify-center pt-8 font-urbanist font-medium">
        {progress} / 25 sentences completed
      </p>
    </div>
  );
}

// const randomText = () => {
//   const texts = [
//     `You never read a book on psychology, Tippy. You didn't need to. You knew by some divine instinct that you can make more friends in two months by becoming genuinely interested in other people than you can in two years by trying to get other people interested in you.`,
//     `I know more about the private lives of celebrities than I do about any governmental policy that will actually affect me. I'm interested in things that are none of my business, and I'm bored by things that are important to know.`,
//     `A spider's body consists of two main parts: an anterior portion, the prosoma (or cephalothorax), and a posterior part, the opisthosoma (or abdomen).`,
//     `As customers of all races, nationalities, and cultures visit the Dekalb Farmers Market by the thousands, I doubt that many stand in awe and contemplate the meaning of its existence. But in the capital of the Sunbelt South, the quiet revolution of immigration and food continues to upset and redefine the meanings of local, regional, and global identity.`,
//     `Outside of two men on a train platform there's nothing in sight. They're waiting for spring to come, smoking down the track. The world could come to an end tonight, but that's alright. She could still be there sleeping when I get back.`,
//     `I'm a broke-nose fighter. I'm a loose-lipped liar. Searching for the edge of darkness. But all I get is just tired. I went looking for attention. In all the wrong places. I was needing a redemption. And all I got was just cages.`,
//   ];

//   const random = texts[Math.floor(Math.random() * texts.length)];
//   setText(random);
// };

// "use client";
// import { useRef, useState } from "react";
// import UseKeyPress from "@/app/hooks/useKeyPress";

// const randSentences = [
//   "The sunsets over the horizon, painting the sky in hues of orange and pink.",
//   "In a quaint village, nestled between rolling hills, life moves at a leisurely pace.",
//   "The aroma of freshly brewed coffee wafts through the air, awakening the senses.",
//   "A mysterious door appears in the middle of the ancient forest, inviting curious adventurers.",
//   "Waves crash against the rugged cliffs, creating a mesmerizing dance of water and stone.",
//   "Lost in a book, time seems to stand still as the words transport the reader to distant realms.",
//   "The bustling market is a kaleidoscope of colors, sounds, and the enticing fragrance of spices.",
//   "A lone wolf howls at the full moon, its haunting melody echoing through the silent night.",
//   "A secret garden blooms with vibrant flowers, hidden away from the world's prying eyes.",
//   "As the first snowflake falls, a winter wonderland transforms the landscape into a magical realm.",
// ];

// const TypeGrind = () => {
//   const [sentences, setSentences] = useState(randSentences[0]);
//   const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
//   const [typedSentence, setTypedSentence] = useState("");
//   const [completedSentences, setCompletedSentences] = useState(0);
//   const timerRef = useRef(null);

//   const currentSentence = sentences[currentSentenceIndex];

//   const handleInputChange = (e) => {
//     setTypedSentence(e.target.value);
//     const typedWords = typedSentence.split(" ");
//     if (typedWords.length > currentSentenceIndex) {
//       const isCorrect =
//         typedWords[currentSentenceIndex] ===
//         sentences.split(" ")[currentSentenceIndex];
//       if (isCorrect) {
//         setCurrentSentenceIndex(currentSentenceIndex + 1);
//       }
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       clearInterval(timerRef.current);
//     }
//   };

//   const handleNextSentence = () => {
//     if (typedSentence === currentSentence) {
//       setCompletedSentences(completedSentences + 1);
//       setCurrentSentenceIndex(currentSentenceIndex + 1);
//       setTypedSentence("");
//     }
//   };

//   const isComplete = completedSentences === 100;

//   if (isComplete) {
//     return (
//       <div>
//         <h1>Congratulations!</h1>
//         <p>You have successfully typed 100 sentences.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full px-[325px] font-urbanist text-white">
//       <div className="mx-auto h-[28rem] w-[50rem] border-[0.5px] border-[#828282] bg-background px-12 pb-12 pt-24 text-center">
//         <div className="relative flex h-full flex-col items-center justify-between">
//           <p>
//             {sentences.split(" ").map((word, index) => (
//               <span
//                 key={index}
//                 className={index < currentSentenceIndex ? "correct" : ""}
//               >
//                 {word}{" "}
//               </span>
//             ))}
//           </p>
//           <input
//             className="h-[3rem] w-[40rem] border-[0.5px] border-none bg-background text-center text-lg placeholder:text-[#828282]"
//             type="text"
//             placeholder={currentSentence}
//             value={typedSentence}
//             onChange={handleInputChange}
//           />
//           <br />
//           <button
//             className="absolute bottom-0 w-full border-t-[0.5px] border-[#828282] pt-10"
//             onClick={handleNextSentence}
//           >
//             Next Sentence
//           </button>
//           <br />
//         </div>
//       </div>
//       <p className="flex justify-center pt-8 font-urbanist font-medium">
//         {completedSentences} / 50 sentences completed
//       </p>
//     </div>
//   );
// };

// export default TypeGrind;
