import { Features } from "./_components/features";
import Hero from "./_components/hero";

const Page = () => {
  return (
    <div className="dark">
      <Hero />
      <section className="px-4 md:px-0">
        <Features />
      </section>
    </div>
  );
};

export default Page;
