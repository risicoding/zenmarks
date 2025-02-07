import { AppSidebar } from "@/components/dashboard/app-sidebar";
import Navbar from "@/components/dashboard/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-col w-full">
        <Navbar />
{children}</div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
