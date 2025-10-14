
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PageHeader } from '@/components/page-header';
import { useAuth } from '@/firebase';
import Link from 'next/link';

// Mock data for teams
const teams = [
  { id: 'team-a', name: 'Warriors', logo: 'https://picsum.photos/seed/warriors/100' },
  { id: 'team-b', name: 'Lakers', logo: 'https://picsum.photos/seed/lakers/100' },
  { id: 'team-c', name: 'Raptors', logo: 'https://picsum.photos/seed/raptors/100' },
];

const SELECTED_TEAM_KEY = 'selected-team-id';

export default function TeamSelectionPage() {
  const router = useRouter();
  const { user, isUserLoading } = useAuth();

  useEffect(() => {
    // If a team is already selected, redirect to the dashboard.
    const selectedTeamId = localStorage.getItem(SELECTED_TEAM_KEY);
    if (selectedTeamId) {
      router.push('/dashboard');
    }
  }, [router]);
  
  if (isUserLoading) {
    return <div>Loading...</div>
  }

  const handleTeamSelect = (teamId: string) => {
    localStorage.setItem(SELECTED_TEAM_KEY, teamId);
    router.push('/dashboard');
  };

  if (!user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Welcome to Sixx</CardTitle>
                    <CardDescription>Please sign in to manage your teams.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Select a Team" description="Choose a team to manage." />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card
            key={team.id}
            onClick={() => handleTeamSelect(team.id)}
            className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Avatar className="size-24 mb-4">
                <AvatarImage src={team.logo} />
                <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{team.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
