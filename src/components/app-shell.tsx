
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
  BarChart3,
  Settings,
  LogOut,
  Swords,
  Replace,
} from "lucide-react";
import { Logo } from "./logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";


const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/roster", icon: Users, label: "Roster" },
  { href: "/schedule", icon: Calendar, label: "Schedule" },
  { href: "/communication", icon: MessageSquare, label: "Messages" },
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

function UserNav() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      // Clear selected team on sign out
      localStorage.removeItem('selected-team-id');
      router.push('/');
    }
  };
  
  const handleSwitchTeam = () => {
    localStorage.removeItem('selected-team-id');
    router.push('/');
  };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative size-9 rounded-full">
                    <Avatar className="size-9">
                        <AvatarImage src={user?.photoURL || "https://picsum.photos/seed/coach/40/40"} alt={user?.displayName || "Coach"} />
                        <AvatarFallback>{user?.displayName?.charAt(0) || 'C'}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.displayName || "Coach"}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email || "coach@example.com"}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/settings">
                            <Settings className="mr-2" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSwitchTeam}>
                        <Replace className="mr-2" />
                        <span>Switch Team</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2" />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


function BottomBar() {
  const pathname = usePathname();
  const mobileNavItems = navItems;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className={cn("grid h-16 items-center justify-items-center", `grid-cols-${mobileNavItems.length}`)}>
        {mobileNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 rounded-md p-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary",
              (pathname === item.href) && "text-primary"
            )}
          >
            <item.icon className="size-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function AppShellInternal({ children }: { children: React.ReactNode }) {
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const [isClient, setIsClient] = React.useState(false);
  const [teamSelected, setTeamSelected] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    setTeamSelected(!!localStorage.getItem('selected-team-id'));
  }, []);

  // Don't render sidebar on the team selection page
  if (isClient && pathname === '/' && !teamSelected) {
    return <main>{children}</main>;
  }
  
  if (isUserLoading || !isClient) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
    // This can be a dedicated sign-in page component
    return (
        <div className="flex h-screen items-center justify-center">
             <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Welcome to Sixx</CardTitle>
                    <CardDescription>Please sign in to manage your teams.</CardDescription>
                </CardHeader>
             </Card>
        </div>
    )
  }
  
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <NavMenu />
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenuItem>
             <SidebarMenuButton asChild>
                <Link href="/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
             </SidebarMenuButton>
           </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-background p-2 lg:px-4 h-14">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
            </div>
            <div className="flex items-center gap-4">
                 <UserNav />
            </div>
        </header>
        <main className="pb-16 md:pb-0">{children}</main>
        {isMobile && <BottomBar />}
      </SidebarInset>
    </>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = React.useState(false);
  const [teamSelected, setTeamSelected] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    setTeamSelected(!!localStorage.getItem('selected-team-id'));
  }, []);


  // If we are on the root team selection page, don't wrap with SidebarProvider
  if (isClient && pathname === '/' && !teamSelected) {
     return <AppShellInternal>{children}</AppShellInternal>;
  }

  return (
      <SidebarProvider>
        <AppShellInternal>{children}</AppShellInternal>
      </SidebarProvider>
  );
}
