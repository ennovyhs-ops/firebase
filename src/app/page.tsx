
"use client";

import { useEffect } from 'react';
import { useAppContext } from '@/context/app-context';
import { useRouter } from 'next/navigation';
import LoginPage from '@/app/login/page';
import TeamSelectionPage from './teams/page';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { currentUser, currentAccountType, selectedTeam } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      if (currentAccountType === 'coach') {
        if (selectedTeam) {
          router.replace('/coach/dashboard');
        } else {
          router.replace('/teams');
        }
      } else if (currentAccountType === 'player') {
        router.replace('/player/dashboard');
      } else if (currentAccountType === 'parent') {
        router.replace('/parent/dashboard');
      }
    }
  }, [currentUser, currentAccountType, selectedTeam, router]);

  if (!currentUser) {
    return <LoginPage />;
  }

  if (currentAccountType === 'coach' && !selectedTeam) {
    return <TeamSelectionPage />;
  }
  
  // Show a loading state while redirecting
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
    </div>
  );
}
