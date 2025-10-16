
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Users, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/player/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/player/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/player/team', icon: Users, label: 'Team' },
    { href: '/player/profile', icon: UserCircle, label: 'Profile' },
];

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full min-h-screen">
            <main className="flex-grow pb-20">
                {children}
            </main>
            <footer className="fixed bottom-0 left-0 right-0 bg-background border-t">
                <nav className="grid grid-cols-4 h-16 items-center">
                    {navItems.map((item) => {
                        const isActive = item.href === '/player/dashboard' ? pathname === '/player' || pathname === '/player/dashboard' : pathname.startsWith(item.href);
                        return (
                            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                                <item.icon className={cn("size-6", isActive && "text-primary")} />
                                <span className={cn("text-xs", isActive && "text-primary font-semibold")}>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
            </footer>
        </div>
    );
}
