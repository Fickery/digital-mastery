import VideoPlayer from "@/components/videoPlayer";
import React from "react";

export default function page() {
  return (
    <>
      <div className="flex w-full justify-between px-8 pt-20 font-urbanist uppercase text-white">
        <p>back</p>
        <p className="text-sm capitalize">ad marathon</p>
        <p>next</p>
      </div>
      <div>
        <VideoPlayer videoUrl={""} />
      </div>
    </>
  );
}
