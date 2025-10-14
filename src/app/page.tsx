
'use client';

import { useRouter } from 'next/navigation';
import { useTeam } from '@/context/team-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { ArrowRight, Users } from 'lucide-react';
import { useUser } from '@/firebase';

export default function SelectTeamPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { teams, setSelectedTeam } = useTeam();

  const handleTeamSelection = (teamId: string) => {
    setSelectedTeam(teamId);
    router.push('/dashboard');
  };

  if (isUserLoading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!user) {
     return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
            <PageHeader title="Welcome to Sixx" description="Please sign in to manage your teams." />
        </div>
     )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Select a Team"
        description="Choose the team you want to manage."
      />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.id} className="flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="bg-accent text-accent-foreground p-3 rounded-full">
                        <Users className="size-6" />
                    </div>
                    <div>
                        <CardTitle>{team.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{team.sport}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button
                onClick={() => handleTeamSelection(team.id)}
                className="w-full"
              >
                Manage Team <ArrowRight className="ml-2 size-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
