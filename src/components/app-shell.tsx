"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  ClipboardCheck,
  BarChart3,
  Settings,
} from "lucide-react";
import { Logo } from "./logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "./ui/button";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/roster", icon: Users, label: "Roster" },
  { href: "/schedule", icon: Calendar, label: "Schedule" },
  { href: "/communication", icon: MessageSquare, label: "Communication" },
  { href: "/attendance", icon: ClipboardCheck, label: "Attendance" },
  { href: "/performance", icon: BarChart3, label: "Performance" },
];

function NavMenu() {
    const pathname = usePathname();
    const { setOpenMobile, isMobile } = useSidebar();

    const handleLinkClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    }

    return (
        <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  onClick={handleLinkClick}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
    )
}


export function AppShell({ children }: { children: React.ReactNode }) {
  const coachImage = PlaceHolderImages.find(p => p.id === 'coach');

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <NavMenu />
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={coachImage?.imageUrl} alt="Coach" data-ai-hint={coachImage?.imageHint} />
              <AvatarFallback>CS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-semibold text-sidebar-foreground">
                Coach Steve
              </span>
              <Link href="/settings" className="text-xs text-sidebar-foreground/70 hover:underline">
                Team Settings
              </Link>
              <span className="text-xs text-sidebar-foreground/50">
                Administrator
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between border-b p-2 lg:px-4">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                  <Link href="/settings">
                    <Settings className="size-5" />
                  </Link>
                </Button>
                 <Avatar className="size-9">
                    <AvatarImage src={coachImage?.imageUrl} alt="Coach" data-ai-hint={coachImage?.imageHint} />
                    <AvatarFallback>CS</AvatarFallback>
                </Avatar>
            </div>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
