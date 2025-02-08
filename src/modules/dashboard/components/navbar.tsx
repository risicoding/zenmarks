import { UserButton } from "@clerk/nextjs";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Navbar = () => {
  return (
    <header className="flex gap-4 px-4 py-6">
      <SidebarTrigger />
      <div className="flex w-full justify-end">
        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;
