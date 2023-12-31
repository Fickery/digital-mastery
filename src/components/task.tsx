"use client";
import { FooterContainer, FooterItem } from "@/components/footer";
import { getTaskRoute, getTasksCount, tasks } from "@/lib/tasks";
import confetti from "canvas-confetti";
import Link from "next/link";
import { useEffect, useState } from "react";

type TaskCompletionStatus = {
  [taskName: string]: boolean;
};

export default function Task() {
  const [taskCompletionStatus, setTaskCompletionStatus] =
    useState<TaskCompletionStatus>({});
  const [daysDone, setDaysDone] = useState(0);

  useEffect(() => {
    const savedDaysDone = localStorage.getItem("daysDone");
    if (savedDaysDone) {
      setDaysDone(parseInt(savedDaysDone));
    }
  }, []);

  useEffect(() => {
    const totalCompleted =
      Object.values(taskCompletionStatus).filter(Boolean).length;

    if (totalCompleted === getTasksCount()) {
      const lastCompletedDate = localStorage.getItem("lastCompletedDate");
      const currentDate = new Date().toDateString();

      if (lastCompletedDate !== currentDate) {
        alert("You have completed all the tasks for today!");
        confetti({
          startVelocity: 70,
          spread: 1000,
          ticks: 120,
          zIndex: 0,
          colors: ["#36454F", "#A9A9A9", "#36454F", "#D3D3D3", "#818589"],
          particleCount: 250,
          origin: { y: 0.5 },
        });

        setDaysDone((prevDaysDone) => {
          const newDaysDone = prevDaysDone + 1;
          localStorage.setItem("daysDone", newDaysDone.toString());
          localStorage.setItem("lastCompletedDate", currentDate); // Save the completion date
          return newDaysDone;
        });
      }
    }
  }, [taskCompletionStatus]);

  useEffect(() => {
    const storedCompletionStatus = tasks.reduce<TaskCompletionStatus>(
      (acc, task) => {
        const stored = localStorage.getItem(`taskCompleted-${task.name}`);
        acc[task.name] = stored === "true";
        return acc;
      },
      {},
    );

    setTaskCompletionStatus(storedCompletionStatus);
  }, []);

  const totalCompleted =
    Object.values(taskCompletionStatus).filter(Boolean).length;

  //dev tools ----------------
  const resetDailyProgress = () => {
    resetCompletedTasks();
    setDaysDone(0);
    localStorage.setItem("daysDone", "0");
  };

  const seeTaskCompletionStatus = () => {
    console.log(taskCompletionStatus);
  };

  const resetCompletedTasks = () => {
    const resetStatus = tasks.reduce<TaskCompletionStatus>((acc, task) => {
      acc[task.name] = false;
      localStorage.setItem(`taskCompleted-${task.name}`, "false");
      return acc;
    }, {});
    setTaskCompletionStatus(resetStatus);
  };
  return (
    <div className="flex h-screen w-full flex-col justify-center gap-6 text-2xl text-white sm:flex-row sm:gap-0 sm:text-base">
      {tasks.map(({ name, index }) => {
        const isCompleted = taskCompletionStatus[name];
        return (
          <div
            key={index}
            className={`flex w-full items-center justify-evenly font-urbanist transition-all ease-in-out ${
              isCompleted === true
                ? "pointer-events-none line-through opacity-25"
                : "hover:bg-neutral-900 hover:bg-opacity-40 hover:opacity-100"
            }`}
          >
            <div>
              <Link href={getTaskRoute(name)}>{name}</Link>
            </div>
          </div>
        );
      })}

      <FooterContainer>
        {totalCompleted <= 1 ? (
          <FooterItem>{`${totalCompleted}/${getTasksCount()} TASK COMPLETED`}</FooterItem>
        ) : (
          <FooterItem>{`${totalCompleted}/${getTasksCount()} TASKS COMPLETED`}</FooterItem>
        )}
        {totalCompleted <= 1 ? (
          <FooterItem>0 DAY DONE</FooterItem>
        ) : (
          <FooterItem>{`${daysDone} DAYS DONE`}</FooterItem>
        )}
        <FooterItem>
          <button
            className="opacity-50 hover:opacity-100"
            onClick={resetCompletedTasks}
          >
            Reset Tasks Completed
          </button>
        </FooterItem>
        <FooterItem>
          <button
            className="opacity-50 hover:opacity-100"
            onClick={seeTaskCompletionStatus}
          >
            See Task Completion Status
          </button>
        </FooterItem>
        <FooterItem>
          <button
            className="opacity-50 hover:opacity-100"
            onClick={resetDailyProgress}
          >
            Reset Daily Progress
          </button>
        </FooterItem>
      </FooterContainer>
    </div>
  );
}
