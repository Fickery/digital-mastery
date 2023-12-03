import React from "react";
import { SecondaryButton } from "./ui/secondaryButton";

type heroProps = {
  mode: "login" | "register";
  setMode: React.Dispatch<React.SetStateAction<"login" | "register">>;
};

export default function HeroText({ mode, setMode }: heroProps) {
  return (
    <>
      <div className="flex flex-col items-center uppercase">
        <p className="text-[15.5rem] font-black leading-none text-primary">
          DIGITAL MASTERY
        </p>
        <div className="w-7/12">
          <p className="text-2xl font-light">grind to digital mastery</p>
          <div className="flex flex-col pt-12">
            <SecondaryButton
              className={`w-fit cursor-pointer ${
                mode === "register"
                  ? "text-shadow-white"
                  : "hover:text-shadow-none blur-[1px] hover:text-primary-foreground hover:blur-0"
              }`}
              onClick={() => setMode("register")}
            >
              Register
            </SecondaryButton>
            <SecondaryButton
              className={`w-fit cursor-pointer ${
                mode === "login"
                  ? "text-shadow-white"
                  : "hover:text-shadow-none blur-[1px] hover:text-primary-foreground hover:blur-0"
              }`}
              onClick={() => setMode("login")}
            >
              Login
            </SecondaryButton>
          </div>
        </div>
      </div>
    </>
  );
}
