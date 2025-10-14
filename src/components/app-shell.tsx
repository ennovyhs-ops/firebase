
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
} from "lucide-react";
import { Logo } from "./logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "./ui/button";
import { useAuth, useUser } from "@/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
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

function AuthButton() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
  
  if (isUserLoading) {
    return null;
  }

  if (user) {
    return (
      <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
        <LogOut />
        <span>Sign Out</span>
      </Button>
    )
  }

  return (
    <Button variant="ghost" className="w-full justify-start" onClick={handleSignIn}>
      <LogIn />
      <span>Sign in with Google</span>
    </Button>
  )
}

function AppShellInternal({ children }: { children: React.ReactNode }) {
  const coachImage = PlaceHolderImages.find(p => p.id === 'coach');
  const { isMobile, setOpenMobile } = useSidebar();
  const { user, isUserLoading } = useUser();


  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <NavMenu />
        </SidebarContent>
        <SidebarFooter>
          { !isUserLoading && user ? (
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? "User"} />
                <AvatarFallback>{user.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-semibold text-sidebar-foreground">
                  {user.displayName}
                </span>
                <button onClick={async () => await signOut(useAuth())} className="text-xs text-sidebar-foreground/70 hover:underline text-left">
                  Sign Out
                </button>
              </div>
            </div>
          ) : !isUserLoading ? (
             <AuthButton />
          ) : null}
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
                    <AvatarImage src={user?.photoURL ?? coachImage?.imageUrl} alt={user?.displayName ?? "Coach"} data-ai-hint={coachImage?.imageHint} />
                    <AvatarFallback>{user?.displayName?.charAt(0) ?? 'CS'}</AvatarFallback>
                </Avatar>
            </div>
        </header>
        <main>{children}</main>
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
