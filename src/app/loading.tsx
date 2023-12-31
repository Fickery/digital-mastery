import React from "react";
import { MoonLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="font-urbanist font-bold text-white">
      <div className="mx-auto flex h-screen w-full flex-col items-center justify-center bg-background">
        <MoonLoader color="#828282" speedMultiplier={1} className="pb-8" />
        <p className="text-md animate-pulse pt-12 font-thin tracking-widest">
          Loading...
        </p>
      </div>
    </div>
  );
}
