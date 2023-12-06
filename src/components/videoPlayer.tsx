"use client";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoUrl?: string;
}

const VideoPlayer = () => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  const videoEnded = () => {
    setIsEnded(true);
    alert("Video has ended");
  };

  const handleDuration = (d: number) => {
    setDuration(d);
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    setCurrentTime(progress.playedSeconds);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="relative h-[28rem] w-[50rem] bg-black">
          <ReactPlayer
            ref={playerRef}
            title=""
            className="absolute left-0 top-0"
            url=""
            width="100%"
            height="100%"
            onDuration={handleDuration}
            onProgress={handleProgress}
            onEnded={videoEnded}
            controls={true}
          />
        </div>

        <div className="flex flex-col items-center justify-center pt-6 font-urbanist font-medium text-white">
          <p className="justify-center text-base">
            {formatTime(duration - currentTime)}
          </p>{" "}
          <p className="text-sm">Remaining</p>
          {/* <p>{isEnded ? "Video has ended" : "Video is still playing"}</p> */}
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
