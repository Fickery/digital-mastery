import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user) {
    return (
      <div className="text-white">Welcome back {session?.user.username}!</div>
    );
  }
  return <h2>Login to see page</h2>;
}
