import { AppSidebar } from "@/modules/dashboard/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/modules/dashboard/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { TRPCProvider } from "@/trpc/client";
import { DashboardWrapper } from "@/modules/dashboard/dashboard-wrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const DashboardLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <body className={cn("antialiased", inter.className)}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TRPCProvider>
          <SidebarProvider>
            <AppSidebar />
            <div className="w-full flex-col">
              <Navbar />
              <DashboardWrapper>{children}</DashboardWrapper>
            </div>
          </SidebarProvider>
        </TRPCProvider>
      </ThemeProvider>
    </body>
  );
};

export default DashboardLayout;
