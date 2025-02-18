import Contact from "./_components/contact";
import { Features } from "./_components/features";
import Hero from "./_components/hero";

import Image from "next/image";
const Page = () => {
  return (
    <div className="dark flex w-full justify-center">
      <div className="max-w-3xl">
        <Hero />
        <Features />
        <div className="flex items-center justify-center px-6 py-24">
          <Image
            src="/zenmarks-dashboard.jpg"
            alt="zenmarks"
            width={500}
            height={200}
          />
        </div>
        <Contact />
      </div>
    </div>
  );
};

export default Page;
