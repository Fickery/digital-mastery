"use client";
import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoUrl?: string;
  onVideoEnd?: () => void;
}

const VideoPlayer = ({ videoUrl, onVideoEnd }: VideoPlayerProps) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const handleDuration = (d: number) => {
    setDuration(d);
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    setCurrentTime(progress.playedSeconds);
  };

  //   useEffect(() => {
  //     const player = playerRef.current;

  //     if (player) {
  //       player.on("ended", onVideoEnd);
  //     }

  //     return () => {
  //       if (player) {
  //         player.off("ended", onVideoEnd);
  //       }
  //     };
  //   }, [videoUrl, onVideoEnd]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="m-5 h-fit w-1/2">
        <ReactPlayer
          ref={playerRef}
          //   url={videoUrl}
          url="https://www.youtube.com/watch?v=VPpTGtbhsqI"
          width="100%"
          height="100%"
          onDuration={handleDuration}
        />
        <div className="flex flex-col items-center justify-center font-urbanist font-semibold text-white">
          <p className="justify-center">{formatTime(duration - currentTime)}</p>{" "}
          <p>Remaining</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
