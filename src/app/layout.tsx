import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";

const RootLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
    >
      <html>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
