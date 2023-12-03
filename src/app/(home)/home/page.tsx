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
    "Catcha Repeater",
    "Endless Loading",
  ];

  if (session?.user) {
    return (
      <div className="hero">
        <div className="overlay">
          <div className="flex h-screen w-full text-white">
            {task.map((t) => (
              <div className="font-urbanist delay-[10ms] flex w-full items-center justify-evenly opacity-70 transition-all ease-in-out hover:bg-neutral-900 hover:bg-opacity-40 hover:opacity-100">
                <div>
                  <Link href="/" key={t}>
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
  return <h2>Login to see page</h2>;
}
