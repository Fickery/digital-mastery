"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <DropdownMenuItem
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/`,
        })
      }
    >
      Sign out
    </DropdownMenuItem>
  );
};

export default SignOutBtn;
