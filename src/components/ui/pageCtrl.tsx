"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { tasks, getTaskRoute } from "@/lib/tasks";

export default function PageCtrl() {
  const router = useRouter();
  const pathName = usePathname();

  const formattedPathName = pathName.replace(/^\//, "").replace(/-/g, " ");

  const navToHome = () => {
    router.replace("/home");
  };

  const pathTask = tasks.find((task) => getTaskRoute(task.name) === pathName);
  const currIndex = pathTask?.index || 0;
  const nextIndex = currIndex % tasks.length || tasks.length;
  const lastIndex = pathName === "/endless-loading";

  //   const nextBtnRender = !lastIndex;

  const navToNext = () => {
    const nextTask = tasks[nextIndex];

    if (nextTask) {
      router.replace(getTaskRoute(nextTask.name));
    } else if (lastIndex) {
      router.replace("/ad-marathon");
    } else {
      console.error("Next task not found");
    }
  };

  if (pathName === "/home") {
    return null;
  } else {
    return (
      <>
        <div className="flex w-full justify-between px-8 pb-20 pt-20 font-urbanist text-white">
          <button onClick={navToHome} className="uppercase hover:underline">
            back
          </button>
          <p className="text-sm capitalize">{formattedPathName}</p>

          <button onClick={navToNext} className="uppercase hover:underline">
            next
          </button>
        </div>
      </>
    );
  }
}
