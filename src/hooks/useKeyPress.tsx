import { useEffect, useState } from "react";

const UseKeyPress = (callback: (key: string | null) => void) => {
  const [keyPressed, setKeyPressed] = useState<string | null>();

  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      const { key } = e;
      if (key.length === 1 || key === "Backspace") {
        setKeyPressed(key);
        callback && callback(key);
      }
      if (key === "" && e.target == document.body) {
        e.preventDefault();
      }
    };
    const upHandler = () => {
      setKeyPressed(null);
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [callback]);
  return keyPressed;
};

export default UseKeyPress;
