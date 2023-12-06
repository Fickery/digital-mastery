import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import SignOutBtn from "./signOutBtn";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed top-0 z-50 flex w-full justify-between px-8 py-5 text-white">
      <Link href="/home" className="cursor-pointer text-xl font-bold">
        DIGITAL MASTERY
      </Link>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {session?.user.username} {session?.user.name}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <SignOutBtn />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
