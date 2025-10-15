
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Replace,
  Menu,
} from "lucide-react";
import { Logo } from "./logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
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
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { useAuth, useUser } from "@/firebase";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/roster", icon: Users, label: "Roster" },
  { href: "/schedule", icon: Calendar, label: "Schedule" },
  { href: "/communication", icon: MessageSquare, label: "Messages" },
  { href: "/performance", icon: BarChart3, label: "Performance" },
];

function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-colors hover:text-primary",
            pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Logo />
        <div className="flex flex-col space-y-2 mt-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "py-2 px-4 rounded-l-md transition-colors hover:text-primary",
                pathname.startsWith(item.href) ? "bg-accent text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function UserNav() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      // Clear selected team on sign out
      localStorage.removeItem("selected-team-id");
      router.push("/");
    }
  };

  const handleSwitchTeam = () => {
    localStorage.removeItem("selected-team-id");
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-9 rounded-full">
          <Avatar className="size-9">
            <AvatarImage
              src={user?.photoURL || "https://picsum.photos/seed/coach/40/40"}
              alt={user?.displayName || "Coach"}
            />
            <AvatarFallback>
              {user?.displayName?.charAt(0) || "C"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.displayName || "Coach"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || "coach@example.com"}
            </p>
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
  );
}

function AppShellInternal({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const [isClient, setIsClient] = React.useState(false);
  const [teamSelected, setTeamSelected] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const checkTeamSelection = () => {
      setTeamSelected(!!localStorage.getItem("selected-team-id"));
    };

    checkTeamSelection();
    // Use a custom event to re-check when team is selected
    window.addEventListener("teamSelected", checkTeamSelection);

    // Also listen to storage events for changes from other tabs
    window.addEventListener("storage", (e) => {
      if (e.key === "selected-team-id") {
        checkTeamSelection();
      }
    });

    return () => {
      window.removeEventListener("teamSelected", checkTeamSelection);
      window.removeEventListener("storage", (e) => {
        if (e.key === "selected-team-id") {
          checkTeamSelection();
        }
      });
    };
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  // While loading or on the server, show a loading indicator.
  if (isUserLoading || !isClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // If the user is not logged in, show the sign-in card.
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Welcome to Sixx</CardTitle>
            <CardDescription>
              Sign in to manage your sports team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={handleSignIn}>
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 174 58.6l-67.4 66.5c-24.2-23.2-56.2-37.4-92.6-37.4-69.8 0-128.8 58.8-128.8 130.3s59 130.3 128.8 130.3c81.5 0 114.3-51.5 119.1-76.2h-119.1v-87.5h223.1c1.3 12.8 1.9 26.6 1.9 40.8z"></path></svg>
              Sign In with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If on the root page and no team is selected, show the team selection (children).
  if (pathname === "/" && !teamSelected) {
    return <main>{children}</main>;
  }

  // If a team is selected or not on the root page, show the full app shell.
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
            <MainNav />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <MobileNav />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isClient, setIsClient] = React.useState(false);
  
    React.useEffect(() => {
      setIsClient(true);
    }, []);
  
    // Render a basic version on the server and during hydration
    if (!isClient) {
      return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }
  
    // Let the internal component handle the logic once the client has mounted
    return <AppShellInternal>{children}</AppShellInternal>;
  }

    