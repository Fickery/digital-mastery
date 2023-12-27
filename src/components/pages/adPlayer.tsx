"use client";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "../ui/button";

interface VideoPlayerProps {
  videoUrl?: string;
}

const VideoPlayer = () => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [tasksCompleted, setTasksCompleted] = useState(false);

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

  const devCompleteTask = () => {
    setTasksCompleted(true);
    localStorage.setItem("taskCompleted", "true");
    localStorage.setItem("taskCompleted-Ad Marathon", "true");
    localStorage.setItem("lastCompletedDate", new Date().toDateString());
    window.location.href = "home";
  };

  // useEffect(() => {

  // })

  return (
    <div className="w-full px-[325px] font-urbanist font-bold text-white">
      <div className="mx-auto h-[28rem] w-[50rem] border-[0.5px] border-[#828282] bg-background text-center">
        <ReactPlayer
          ref={playerRef}
          title=""
          // className="absolute left-0 top-0"
          url=""
          width="100%"
          height="100%"
          onDuration={handleDuration}
          onProgress={handleProgress}
          onEnded={videoEnded}
          controls={true}
        />
      </div>

      <p className="flex justify-center pt-8 font-urbanist font-medium uppercase">
        {formatTime(duration - currentTime)} remaining
      </p>
      <Button className="mx-auto flex" onClick={devCompleteTask}>
        Dev complete task
      </Button>
      {/* <p>{isEnded ? "Video has ended" : "Video is still playing"}</p> */}
    </div>
  );
};

export default VideoPlayer;
