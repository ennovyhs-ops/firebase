
"use client";

import React from 'react';
import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

export default function TeamSelectionPage() {
    const { teams, setSelectedTeam, currentUser, setCurrentUser } = useAppContext();

    const handleLogout = () => {
        setSelectedTeam(null);
        setCurrentUser(null);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                 <header className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-primary">Welcome, {currentUser?.name}</h1>
                        <p className="text-sm text-muted-foreground">Please select a team to manage.</p>
                    </div>
                    <Button variant="secondary" size="sm" onClick={handleLogout} className="mt-4 sm:mt-0">Logout</Button>
                </header>
                <div className="grid md:grid-cols-2 gap-6">
                    {teams.map((team) => (
                        <Card key={team.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className='flex items-center gap-4'>
                                    <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle>{team.name}</CardTitle>
                                        <CardDescription>{team.sport}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" onClick={() => setSelectedTeam(team)}>
                                    Manage Team
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                 {teams.length === 0 && (
                    <Card>
                        <CardContent className="p-10 text-center">
                            <p className="text-muted-foreground">No teams found. Contact support to get set up.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
