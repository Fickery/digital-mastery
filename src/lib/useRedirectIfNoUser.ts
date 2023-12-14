"use client";
// useRedirectIfNoUser.ts
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useEffect } from "react";

/**
 * Custom hook for redirecting to a specified route if the user is not in the session.
 * @param redirectPath - The path to redirect to.
 * @param session - The session object, typically obtained using next-auth.
 */
const useRedirectIfNoUser = (redirectPath: string, session: Session | null) => {
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push(redirectPath);
    }
  }, [session, redirectPath, router]);
};

export default useRedirectIfNoUser;
