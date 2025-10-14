
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
  LogIn,
  ClipboardCheck,
} from "lucide-react";
import { Logo } from "./logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "./ui/button";
import { useAuth, useUser } from "@/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { TeamSwitcher } from "./team-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/roster", icon: Users, label: "Roster" },
  { href: "/schedule", icon: Calendar, label: "Schedule" },
  { href: "/attendance", icon: ClipboardCheck, label: "Attendance" },
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

function AuthButton() {
  const auth = useAuth();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <Button variant="ghost" className="w-full justify-start" onClick={handleSignIn}>
      <LogIn />
      <span>Sign in with Google</span>
    </Button>
  )
}

function UserNav() {
    const { user, isUserLoading } = useUser();
    const coachImage = PlaceHolderImages.find(p => p.id === 'coach');
    const auth = useAuth();
    
    const handleSignOut = async () => {
        try {
          await signOut(auth);
        } catch (error) {
          console.error("Error signing out", error);
        }
      };
    
    if (isUserLoading) {
        return <Avatar className="size-9" />
    }

    const getDisplayName = () => {
        if (user) return user.displayName || "Johnny";
        return "Johnny";
    }

    const getDisplayEmail = () => {
        if (user) return user.email || "coach@example.com";
        return "coach@example.com";
    }
    
    const getPhotoUrl = () => {
        if (user) return user.photoURL || coachImage?.imageUrl;
        return coachImage?.imageUrl;
    }
    
    const getFallback = () => {
        if (user) return user.displayName?.charAt(0) || 'J';
        return 'J';
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative size-9 rounded-full">
                    <Avatar className="size-9">
                        <AvatarImage src={getPhotoUrl() ?? undefined} alt={getDisplayName()} />
                        <AvatarFallback>{getFallback()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
                        <p className="text-xs leading-none text-muted-foreground">{getDisplayEmail()}</p>
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
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {user ? (
                     <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2" />
                        <span>Sign out</span>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={() => auth && signInWithPopup(auth, new GoogleAuthProvider())}>
                        <LogIn className="mr-2" />
                        <span>Sign in</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


function BottomBar() {
  const pathname = usePathname();
  // Filter out attendance for mobile view
  const mobileNavItems = navItems.filter(item => item.href !== '/attendance');
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className={cn("grid h-16 items-center justify-items-center", `grid-cols-${mobileNavItems.length}`)}>
        {mobileNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 rounded-md p-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary",
              pathname === item.href && "text-primary"
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
  const { user } = useUser();

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
          { !user ? (
            <SidebarMenuItem>
                <AuthButton />
            </SidebarMenuItem>
          ) : null}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background p-2 lg:px-4 h-14">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div className="md:hidden">
                    <TeamSwitcher />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:block">
                    <TeamSwitcher />
                </div>
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
  return (
    <SidebarProvider>
      <AppShellInternal>{children}</AppShellInternal>
    </SidebarProvider>
  );
}
