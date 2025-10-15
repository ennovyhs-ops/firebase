
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Calendar, MessageSquare, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/roster', icon: Users, label: 'Roster' },
    { href: '/schedule', icon: Calendar, label: 'Schedule' },
    { href: '/communication', icon: MessageSquare, label: 'Messages' },
    { href: '/profile', icon: UserCircle, label: 'Profile' },
];

export default function CoachLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full min-h-screen">
            <main className="flex-grow pb-20">
                {children}
            </main>
            <footer className="fixed bottom-0 left-0 right-0 bg-background border-t">
                <nav className="grid grid-cols-5 h-16 items-center">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                            <item.icon className={cn("size-6", pathname.startsWith(item.href) && "text-primary")} />
                            <span className={cn("text-xs", pathname.startsWith(item.href) && "text-primary font-semibold")}>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </footer>
        </div>
    );
}
