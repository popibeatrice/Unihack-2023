"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import Link from "next/link";

function UserWidget({ session }) {
  const userName = session.user.name;
  const imgUrl = session.user.image;

  return (
    <Link
      href="/profile"
      className="flex items-center justify-center gap-2 rounded-full border pl-4 text-lg font-semibold transition-all duration-500 hover:border-foreground"
    >
      <span>{userName}</span>
      <Avatar className="h-12 w-12">
        <AvatarImage src={imgUrl} />
        <AvatarFallback>PFP</AvatarFallback>
      </Avatar>
    </Link>
  );
}

export default UserWidget;
