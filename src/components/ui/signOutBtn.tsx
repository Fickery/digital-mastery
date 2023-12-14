"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignOutBtn = () => {
  const router = useRouter();
  const handleClick = () => {
    signOut({
      redirect: false,
      callbackUrl: `/`,
    });
    router.push("/");
  };

  return <DropdownMenuItem onClick={handleClick}>Sign out</DropdownMenuItem>;
};

export default SignOutBtn;
