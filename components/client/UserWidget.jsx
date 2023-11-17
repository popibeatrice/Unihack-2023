"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";

import { useRef } from "react";

import { signOut } from "next-auth/react";

function UserWidget({ session }) {
  const userName = session.user.name;
  const imgUrl = session.user.image;

  const ref = useRef(null);

  return (
    <div
      focusable
      tabIndex={0}
      ref={ref}
      onClick={() => {
        ref.current.focus();
      }}
      className="group relative flex cursor-pointer items-center justify-center gap-2 rounded-full border pl-4 text-lg font-semibold transition-all duration-500 hover:border-foreground focus:border-foreground"
    >
      <span>{userName}</span>
      <Avatar className="h-12 w-12">
        <AvatarImage src={imgUrl} />
        <AvatarFallback>PFP</AvatarFallback>
      </Avatar>
      <div className="absolute -bottom-[110px] left-1/2 flex w-full origin-top -translate-x-1/2 scale-y-0 flex-col items-start justify-start gap-3 rounded-xl bg-accent p-4 text-lg opacity-0 transition-all duration-300 group-focus-within:scale-y-100 group-focus-within:opacity-100">
        <Link href="/friends" className="hover:underline">
          Friends
        </Link>
        <button
          type="button"
          onClick={() => {
            signOut();
          }}
          className="text-red-600 hover:text-white"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default UserWidget;
