import PageCtrl from "@/components/ui/pageCtrl";
import VideoPlayer from "@/components/pages/videoPlayer";
import React from "react";

export default function Page() {
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-evenly">
        <PageCtrl />
        <VideoPlayer />
      </div>
    </div>
  );
}
