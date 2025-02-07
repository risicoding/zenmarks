import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
import { TRPCProvider } from "@/trpc/client";

const RootLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
    >
      <html>
        <body className="">
          <TRPCProvider>{children}</TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
