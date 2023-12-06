import Link from "next/link";
import { FooterContainer, FooterItem } from "@/components/footer";
import { getTaskRoute, getTasksCount, tasks } from "@/lib/tasks";

export default function Task() {
  return (
    <>
      <div className="flex h-screen w-full text-white">
        {tasks.map(({ name, index }) => (
          <div
            key={index}
            className="delay-[10ms] flex w-full items-center justify-evenly font-urbanist opacity-70 transition-all ease-in-out hover:bg-neutral-900 hover:bg-opacity-40 hover:opacity-100"
          >
            <div>
              <Link href={getTaskRoute(name)}>{name}</Link>
            </div>
          </div>
        ))}

        <FooterContainer>
          <FooterItem>{`0/${getTasksCount()} TASKS COMPLETED`}</FooterItem>
          <FooterItem>32 DAYS DONE</FooterItem>
        </FooterContainer>
      </div>
    </>
  );
}
