
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Calendar, MessageSquare, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/coach/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/coach/roster', icon: Users, label: 'Roster' },
    { href: '/coach/schedule', icon: Calendar, label: 'Schedule' },
    { href: '/coach/communication', icon: MessageSquare, label: 'Messages' },
    { href: '/coach/profile', icon: UserCircle, label: 'Profile' },
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
                    {navItems.map((item) => {
                        // Special handling for dashboard as it's the root for the coach section
                        const isActive = item.href === '/coach/dashboard' ? pathname === '/coach' || pathname === '/coach/dashboard' : pathname.startsWith(item.href);
                        return (
                            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                                <item.icon className={cn("size-6", isActive && "text-primary")} />
                                <span className={cn("text-xs", isActive && "text-primary font-semibold")}>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </footer>
        </div>
    );
}
