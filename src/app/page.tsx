"use client";
import Login from "@/components/form/loginForm";
import Register from "@/components/form/registerForm";
import { SecondaryButton } from "@/components/ui/secondaryButton";
import { useState } from "react";
import "./globals.css";
import "../styles/film-grain.css";
import HeroText from "@/components/heroText";

export default function Home() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="hero">
      <div className="overlay">
        <main className="flex min-h-screen flex-col items-center justify-between text-primary">
          <HeroText mode={mode} setMode={setMode} />
          <div className="mb-[8rem] w-7/12">
            {mode === "login" ? <Login /> : <Register setMode={setMode} />}
          </div>
        </main>
      </div>
    </div>
  );
}
