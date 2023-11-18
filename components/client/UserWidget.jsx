"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { signOut } from "next-auth/react";

function UserWidget({ session }) {
  const userName = session.user.name;
  const imgUrl = session.user.image;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative flex cursor-pointer items-center justify-center gap-2  pl-4 text-lg font-semibold transition-all duration-500">
          <span>{userName}</span>
          <Avatar className="h-12 w-12">
            <AvatarImage src={imgUrl} />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/dashboard/friends">Friends</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            type="button"
            onClick={() => {
              signOut();
            }}
            className="text-red-600 hover:underline"
          >
            Log Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserWidget;
