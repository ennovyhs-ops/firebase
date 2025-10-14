
'use client';

import { useRouter } from 'next/navigation';
import { useTeam } from '@/context/team-context';
import { useEffect } from 'react';

export default function SelectTeamPage() {
  const router = useRouter();
  const { setSelectedTeam, teams } = useTeam();

  useEffect(() => {
    // Automatically select the first team and redirect to the dashboard
    if (teams.length > 0) {
      setSelectedTeam(teams[0].id);
      router.push('/dashboard');
    }
  }, [teams, setSelectedTeam, router]);

  // Render a loading state while redirecting
  return <div>Loading...</div>;
}
