
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, MessageSquare, Users, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/app-context';

const navItems = [
    { href: '/parent/dashboard', icon: Calendar, label: 'Dashboard' },
    { href: '/parent/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/player/team', icon: Users, label: 'Team' },
    { href: '/parent/profile', icon: UserCircle, label: 'Profile' },
];

export default function ParentLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { currentUser } = useAppContext();

    return (
        <div className="flex flex-col h-full min-h-screen">
             <header className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 mb-6 border-b container mx-auto px-4 pt-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Welcome, {currentUser?.name}</h1>
                    <p className="text-sm text-muted-foreground">Parent/Guardian Dashboard</p>
                </div>
            </header>
            <main className="flex-grow pb-20">
                {children}
            </main>
            <footer className="fixed bottom-0 left-0 right-0 bg-background border-t">
                <nav className="grid grid-cols-4 h-16 items-center">
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
