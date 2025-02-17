import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="flex max-w-4xl mx-auto items-center justify-between px-8 py-4 text-white shadow-md">
      {/* Logo */}
      <div className="text-md flex items-center gap-3 font-semibold">
        <Image src="/logo.svg" width={30} height={40} alt="logo" />
        <h2 className="hidden sm:flex">Zenmarks</h2>
      </div>

      {/* Large device nav */}
      {/* <nav className="hidden items-center gap-6 text-sm text-gray-300/90 sm:flex"> */}
      {/*   <ul className="flex items-center gap-8"> */}
      {/*     <li className="cursor-pointer hover:text-gray-300">Home</li> */}
      {/*     <li className="cursor-pointer hover:text-gray-300">Features</li> */}
      {/*     <li className="cursor-pointer hover:text-gray-300">Contact</li> */}
      {/*   </ul> */} 
      {/* </nav> */}

      {/* Auth */}
      <div className="items-center gap-4 flex">
        <Link href="/sign-in">
          <Button variant="outline" className="rounded-lg">
            Log in
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button className="rounded-lg">Sign up</Button>
        </Link>
      </div>

      {/* Small device nav placeholder */}
    </header>
  );
};

export default Navbar;
