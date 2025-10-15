
"use client";

import React from 'react';
import { useAppContext } from '@/context/app-context';
import LoginPage from '@/app/login/page';
import CoachDashboard from '@/app/coach/page';
import PlayerDashboard from '@/app/player/page';
import ParentDashboard from '@/app/parent/page';
import TeamSelectionPage from '@/app/teams/page';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { currentUser, currentAccountType, selectedTeam } = useAppContext();

  if (!currentUser) {
    return <LoginPage />;
  }

  if (currentAccountType === 'coach' && !selectedTeam) {
    return <TeamSelectionPage />;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
        {currentAccountType === 'coach' && <CoachDashboard />}
        {currentAccountType === 'player' && <PlayerDashboard />}
        {currentAccountType === 'parent' && <ParentDashboard />}
    </div>
  );
}
