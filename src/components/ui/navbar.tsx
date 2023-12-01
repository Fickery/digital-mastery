import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOutBtn from "./signOutBtn";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-between px-5 text-white">
      <p>DIGITAL MASTERY</p>
      <DropdownMenu>
        <DropdownMenuTrigger>{session?.user.username}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <SignOutBtn />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
