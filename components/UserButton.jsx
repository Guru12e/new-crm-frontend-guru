import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogOut, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const UserButton = async () => {
  const session = await getServerSession(authOptions);
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.image} alt="@user" />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {session?.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-white/30 dark:border-slate-700/50"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            onClick={() => router.push("/company-details")}
            className="w-full cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Company Details</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full cursor-pointer"
          >
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
