
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, MessageSquare, Shield, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';

const navItems = [
    { href: '/parent/schedule', icon: Calendar, label: 'Schedule' },
    { href: '/parent/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/parent/child', icon: Shield, label: 'My Child' },
];

export default function ParentLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { currentUser, setCurrentUser } = useAppContext();

    const handleLogout = () => {
        setCurrentUser(null);
    };

    return (
        <div className="flex flex-col h-full min-h-screen">
             <header className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 mb-6 border-b container mx-auto px-4 pt-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Welcome, {currentUser?.name}</h1>
                    <p className="text-sm text-muted-foreground">Parent/Guardian Dashboard</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="mt-4 sm:mt-0">
                    <LogOut className="mr-2" />
                    Logout
                </Button>
            </header>
            <main className="flex-grow pb-20">
                {children}
            </main>
            <footer className="fixed bottom-0 left-0 right-0 bg-background border-t">
                <nav className="grid grid-cols-3 h-16 items-center">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                            <item.icon className={cn("size-6", pathname === item.href && "text-primary")} />
                            <span className={cn("text-xs", pathname === item.href && "text-primary font-semibold")}>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </footer>
        </div>
    );
}
