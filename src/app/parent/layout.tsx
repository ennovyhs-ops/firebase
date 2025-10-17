
"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Users, UserCircle } from 'lucide-react';
import CommonLayout from '@/app/common/layout';

const navItems = [
    { href: '/parent/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/parent/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/player/team', icon: Users, label: 'Team' },
    { href: '/parent/profile', icon: UserCircle, label: 'Profile' },
];

export default function ParentLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <CommonLayout navItems={navItems} pathname={pathname}>
            {children}
        </CommonLayout>
    );
}
