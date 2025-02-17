import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <section className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 text-center text-white">
      <div className="flex max-w-xl flex-col items-center justify-center space-y-6">
        <Button
          variant="outline"
          className="flex items-center space-x-2 rounded-full"
        >
          <span>Welcome to zenmarks</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <h1 className="bg-gradient-to-b from-gray-200 to-gray-800 bg-clip-text text-4xl font-bold leading-tight text-transparent">
          Access all your bookmarks effortlessly
        </h1>
        <p className="flex text-sm text-gray-500">With zenmarks</p>
        {/* <p className="hidden text-sm text-gray-500 sm:flex"> */}
        {/*   zenmarks is a bookmarks management software helping people maintain */}
        {/*   the chaos of their life. */}
        {/* </p> */}
        <div className="flex items-center justify-center space-x-4">
          <Button>Get started</Button>
          <Button variant="outline">Contact</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
