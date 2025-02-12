import { AppSidebar } from "@/modules/dashboard/components/app-sidebar";
import Navbar from "@/modules/dashboard/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full flex-col">
          <Navbar />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
