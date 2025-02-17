"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../../../components/theme-toggle";
import BookmarkSearch from "./bookmark-search";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="flex items-center gap-4 px-4 py-6">
      <SidebarTrigger />
      <Image
        className="hidden dark:flex"
        src="/logo-light.svg"
        height={20}
        width={20}
        alt="zenmarks-logo"
      />
      <Image
        className="flex dark:hidden"
        src="/logo-dark.svg"
        height={20}
        width={20}
        alt="zenmarks-logo"
      />
      <div className="flex w-full justify-end gap-4">
        <BookmarkSearch />
        <ModeToggle />
        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;
