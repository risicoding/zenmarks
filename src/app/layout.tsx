import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
import { dark } from "@clerk/themes";

const RootLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInForceRedirectUrl="/bookmark"
      signUpForceRedirectUrl="/bookmark"
      appearance={{
        baseTheme: dark,
      }}
    >
      <html>{children}</html>
    </ClerkProvider>
  );
};

export default RootLayout;
