"use client";
import Link from "next/link";
import { FooterContainer, FooterItem } from "@/components/footer";
import { getTaskRoute, getTasksCount, tasks } from "@/lib/tasks";
import { useEffect, useState } from "react";

type TaskCompletionStatus = {
  [taskName: string]: boolean;
};

export default function Task() {
  // State to hold completion status for each task
  const [taskCompletionStatus, setTaskCompletionStatus] =
    useState<TaskCompletionStatus>({});

  const seeTaskCompletionStatus = () => {
    console.log(taskCompletionStatus);
  };

  const resetCompletedTasks = () => {
    const resetStatus = tasks.reduce<TaskCompletionStatus>((acc, task) => {
      // Rename 'tasks' to 'task'
      acc[task.name] = false;
      localStorage.setItem(`taskCompleted-${task.name}`, "false");
      return acc;
    }, {});
    setTaskCompletionStatus(resetStatus);
  };

  useEffect(() => {
    const storedCompletionStatus = tasks.reduce<TaskCompletionStatus>(
      (acc, task) => {
        // Rename 'tasks' to 'task'
        const stored = localStorage.getItem(`taskCompleted-${task.name}`);
        acc[task.name] = stored === "true";
        return acc;
      },
      {},
    );

    setTaskCompletionStatus(storedCompletionStatus);
  }, []);

  // Calculate total completed based on taskCompletionStatus
  const totalCompleted =
    Object.values(taskCompletionStatus).filter(Boolean).length;

  return (
    <div className="flex h-screen w-full text-white">
      {tasks.map(({ name, index }) => {
        const isCompleted = taskCompletionStatus[name];
        return (
          <div
            key={index}
            className={`flex w-full items-center justify-evenly font-urbanist transition-all ease-in-out ${
              isCompleted === true
                ? "bg-neutral-900 bg-opacity-40 line-through opacity-100"
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
        <FooterItem>{`${totalCompleted}/${getTasksCount()} TASKS COMPLETED`}</FooterItem>
        <FooterItem>0 DAYS DONE</FooterItem>
        <FooterItem>
          <button onClick={resetCompletedTasks}>Reset Tasks Completed</button>
        </FooterItem>
        <FooterItem>
          <button onClick={seeTaskCompletionStatus}>
            See Task Completion Status
          </button>
        </FooterItem>
      </FooterContainer>
    </div>
  );
}

// className={`${
//   isCompleted ? "pointer-events-none line-through" : ""
// }`}
