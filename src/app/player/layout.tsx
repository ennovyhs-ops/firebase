
"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Users, UserCircle, Calendar } from 'lucide-react';
import CommonLayout from '@/app/common/layout';

const navItems = [
    { href: '/player/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/player/team', icon: Users, label: 'Team' },
    { href: '/player/schedule', icon: Calendar, label: 'Schedule' },
    { href: '/player/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/player/profile', icon: UserCircle, label: 'Profile' },
];

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <CommonLayout navItems={navItems} pathname={pathname}>
            {children}
        </CommonLayout>
    );
}
