
"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Home, Users, Calendar, MessageSquare, UserCircle } from 'lucide-react';
import CommonLayout from '@/app/common/layout';

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
        <CommonLayout navItems={navItems} pathname={pathname}>
            {children}
        </CommonLayout>
    );
}
