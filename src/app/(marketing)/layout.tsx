import { cn } from "@/lib/utils";
import Navbar from "./_components/navbar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const MarketingLayout = async ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <body
      className={cn(
        "dark min-h-screen bg-black font-inter antialiased",
        inter.className,
      )}
    >
      <div>
        <Navbar />
        {children}
      </div>
    </body>
  );
};

export default MarketingLayout;
