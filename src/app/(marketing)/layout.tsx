import { auth } from "@clerk/nextjs/server";

const MarketingLayout = async ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  console.log(await auth());
  return <div>{children}</div>;
};

export default MarketingLayout;
