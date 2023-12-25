"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  const handleClick = async () => {
    await signOut({
      redirect: false,
    });
    window.location.href = "/";
  };

  return <DropdownMenuItem onClick={handleClick}>Sign out</DropdownMenuItem>;
};

export default SignOutBtn;
