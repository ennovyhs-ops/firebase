
"use client";

import React from 'react';
import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Team</TableHead>
                                    <TableHead>Sport</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teams.map((team) => (
                                    <TableRow key={team.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                                                    <Users className="h-5 w-5" />
                                                </div>
                                                <span className="font-medium">{team.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{team.sport}</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" onClick={() => setSelectedTeam(team)}>
                                                Manage <ChevronRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
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
