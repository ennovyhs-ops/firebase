
"use client";

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
    href: string;
    icon: LucideIcon;
    label: string;
}

interface CommonLayoutProps {
    children: React.ReactNode;
    navItems: NavItem[];
    pathname: string;
}

export default function CommonLayout({ children, navItems, pathname }: CommonLayoutProps) {
    return (
        <div className="flex flex-col h-full min-h-screen">
            <main className="flex-grow pb-20">
                {children}
            </main>
            <footer className="fixed bottom-0 left-0 right-0 bg-background border-t">
                <nav className="grid h-16 items-center" style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}>
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
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
