import { FooterContainer, FooterItem } from "@/components/footer";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import "../../../styles/film-grain.css";

export default async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);

  const task = [
    "Ad Marathon",
    "Endless Scroll",
    "Type Grind",
    "Point And Click",
    "Captcha Repeater",
    "Endless Loading",
  ];

  if (session?.user) {
    return (
      <div className="hero">
        <div className="overlay">
          <div className="flex h-screen w-full text-white">
            {task.map((t) => (
              <div className="delay-&lsqb;10ms&rsqb flex w-full items-center justify-evenly font-urbanist opacity-70 transition-all ease-in-out hover:bg-neutral-900 hover:bg-opacity-40 hover:opacity-100">
                <div>
                  <Link href={`${t.toLowerCase().replace(/\s+/g, "-")}`}>
                    {t}
                  </Link>
                </div>
              </div>
            ))}

            <FooterContainer>
              <FooterItem>0/6 TASK COMPLETED</FooterItem>
              <FooterItem>32 DAYS DONE</FooterItem>
            </FooterContainer>
          </div>
        </div>
      </div>
    );
  }
  return <h2 className="text-white">Login to see page</h2>;
}

function formatTaskName(task: string) {
  return task.replace(/\s+/g, "-").toLowerCase();
}
