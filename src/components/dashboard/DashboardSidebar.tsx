import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Backpack, List, Settings, LogOut, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "My Gear", icon: Backpack, url: "/dashboard/gear" },
  { title: "Packing Lists", icon: List, url: "/dashboard/lists" },
  { title: "Account", icon: User, url: "/dashboard/account" },
  { title: "Settings", icon: Settings, url: "/dashboard/settings" },
];

export function DashboardSidebar() {
  return (
    <>
      {/* Mobile Menu Trigger - Always visible on mobile */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-50 md:hidden"
          asChild
        >
          <SidebarTrigger>
            <Menu className="h-6 w-6" />
          </SidebarTrigger>
        </Button>
      </div>

      <Sidebar>
        <SidebarContent className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between px-4 py-2 mt-14 md:mt-0">
            <h2 className="text-xl font-bold text-forest">Trail Gear</h2>
            <div className="hidden md:block">
              <SidebarTrigger />
            </div>
          </div>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <div className="mt-auto p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/login" className="flex items-center gap-2 text-red-500">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  );
}