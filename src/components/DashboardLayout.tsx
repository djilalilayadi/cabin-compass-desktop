
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Bed,
  FileText,
  HeartPulse,
  Settings,
  User,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { title: "Dashboard", path: "/", icon: HeartPulse },
  { title: "Patients", path: "/patients", icon: Users },
  { title: "Appointments", path: "/appointments", icon: Calendar },
  { title: "Reports", path: "/reports", icon: FileText },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) =>
    path === "/" ? currentPath === path : currentPath.startsWith(path);

  const isSectionActive = (section: string) => menuItems.some(
    item => item.path.startsWith(`/${section}`) && isActive(item.path)
  );

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
      isActive
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
    );

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar
        className={cn(
          "border-r transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}
        collapsible
      >
        <div className="flex h-14 items-center justify-center border-b px-4">
          {!collapsed && (
            <h1 className="text-xl font-bold text-sidebar-foreground">
              MedCabin
            </h1>
          )}
          <SidebarTrigger
            className={cn("ml-auto", collapsed && "ml-0")}
            aria-label="Toggle sidebar"
          />
        </div>

        <SidebarContent>
          <SidebarGroup defaultOpen={true}>
            <SidebarGroupLabel className={cn(!collapsed && "px-2 py-1.5")}>
              {!collapsed && "Menu"}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.path}
                        end={item.path === "/"}
                        className={getNavClass}
                      >
                        <item.icon className="h-5 w-5" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              {menuItems.find((item) => isActive(item.path))?.title || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-background p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
