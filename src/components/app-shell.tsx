
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
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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

function UserProfile({ collapsed = false }: { collapsed?: boolean }) {
    const { user, isUserLoading } = useUser();
    const coachImage = PlaceHolderImages.find(p => p.id === 'coach');

    if (isUserLoading && !user) { // Show placeholder when loading and no user
        return (
             <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                <Avatar className="size-9">
                    <AvatarImage src={coachImage?.imageUrl} alt={"Johnny"} data-ai-hint={coachImage?.imageHint} />
                    <AvatarFallback>J</AvatarFallback>
                </Avatar>
                {!collapsed && (
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground truncate">
                            Johnny
                        </span>
                        <span className="text-xs text-muted-foreground">Coach</span>
                    </div>
                )}
            </div>
        )
    }
    
    if (!user) return null; // Don't render if not loading and no user
    
    const displayName = user.displayName || "Johnny";
    const photoURL = user.photoURL || coachImage?.imageUrl;
    const fallback = displayName.charAt(0) || 'U';

    return (
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <Avatar className="size-9">
                <AvatarImage src={photoURL ?? undefined} alt={displayName ?? "User"} data-ai-hint={coachImage?.imageHint} />
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            {!collapsed && (
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground truncate">
                        {displayName}
                    </span>
                    <span className="text-xs text-muted-foreground">Coach</span>
                </div>
            )}
        </div>
    );
}


function BottomBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid h-16 grid-cols-5 items-center justify-items-center">
        {navItems.map((item) => (
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
  const { user, isUserLoading } = useUser();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);


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
          { user ? (
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
          ) : (
             <AuthButton />
          )}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between border-b p-2 lg:px-4 h-14">
            <div className="flex items-center gap-4">
                <Logo className="md:hidden"/>
                 <div className="hidden md:flex items-center gap-4">
                    <SidebarTrigger />
                    {isClient && <UserProfile />}
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                  <Link href="/settings">
                    <Settings className="size-5" />
                  </Link>
                </Button>
                <div className="md:hidden">
                  {isClient && <UserProfile />}
                </div>
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
