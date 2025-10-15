
"use client";

import React from 'react';
import { useAppContext } from '@/context/app-context';
import LoginPage from '@/app/login/page';
import CoachDashboard from '@/app/coach/page';
import PlayerDashboard from '@/app/player/page';
import ParentDashboard from '@/app/parent/page';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { currentUser, currentAccountType } = useAppContext();

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
        {currentAccountType === 'coach' && <CoachDashboard />}
        {currentAccountType === 'player' && <PlayerDashboard />}
        {currentAccountType === 'parent' && <ParentDashboard />}
    </div>
  );
}
