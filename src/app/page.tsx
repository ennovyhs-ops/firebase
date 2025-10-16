
"use client";

import { useAppContext } from '@/context/app-context';
import LoginPage from '@/app/login/page';
import CoachDashboard from './coach/dashboard/page';
import PlayerDashboard from './player/dashboard/page';
import ParentDashboard from './parent/dashboard/page';
import TeamSelectionPage from './teams/page';

export default function Home() {
  const { currentUser, currentAccountType, selectedTeam } = useAppContext();

  if (!currentUser) {
    return <LoginPage />;
  }

  if (currentAccountType === 'coach' && !selectedTeam) {
    return <TeamSelectionPage />;
  }

  const renderDashboard = () => {
    switch(currentAccountType) {
        case 'coach':
            return <CoachDashboard />;
        case 'player':
            return <PlayerDashboard />;
        case 'parent':
            return <ParentDashboard />;
        default:
            return <LoginPage />;
    }
  }

  return (
    <main className="bg-background min-h-screen">
       {renderDashboard()}
    </main>
  );
}
