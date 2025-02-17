import { Features } from "./_components/features";
import Hero from "./_components/hero";

const Page = () => {
  return (
    <div className="dark flex w-full justify-center">
      <div className="max-w-3xl">
        <Hero />
        <Features />
      </div>
    </div>
  );
};

export default Page;
