"use client";
import Login from "@/components/form/loginForm";
import Register from "@/components/form/registerForm";
import { SecondaryButton } from "@/components/ui/secondaryButton";
import { useState } from "react";
import "../styles/film-grain.css";

export default function Home() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="hero">
      <div className="overlay">
        <main className="flex min-h-screen flex-col items-center text-primary">
          <div className="flex w-full flex-col items-center justify-center">
            <p className="text-[13.5rem] font-black leading-none text-primary">
              DIGITAL MASTERY
            </p>
            <div className="w-7/12 pb-[5rem]">
              <p className="text-2xl font-light uppercase text-primary">
                grind to digital mastery
              </p>

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

            <div className="w-7/12">
              {mode === "login" ? <Login /> : <Register setMode={setMode} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
