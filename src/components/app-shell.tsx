
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
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";


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
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
                >
                {item.label}
              </Link>
            ))}
        </nav>
    )
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
                                pathname === item.href ? "bg-accent text-primary" : "text-muted-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
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

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const [isClient, setIsClient] = React.useState(false);
  const [teamSelected, setTeamSelected] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const checkTeamSelection = () => {
        setTeamSelected(!!localStorage.getItem('selected-team-id'));
    };

    checkTeamSelection();
    window.addEventListener('storage', checkTeamSelection);
    window.addEventListener('teamSelected', checkTeamSelection);

    return () => {
        window.removeEventListener('storage', checkTeamSelection);
        window.removeEventListener('teamSelected', checkTeamSelection);
    }
  }, []);

  if (isClient && pathname === '/' && !teamSelected) {
    return <main>{children}</main>;
  }
  
  if (isUserLoading || !isClient) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
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
    <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex gap-6 md:gap-10">
                    <Logo />
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
  )
}
