
"use client";

import React from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/app-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ChevronRight, LogOut } from 'lucide-react';
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
                 <header className="text-center pb-4 mb-6">
                    <h1 className="text-2xl font-bold text-primary">Welcome, {currentUser?.name}</h1>
                    <p className="text-sm text-muted-foreground">Please select a team to manage.</p>
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
                                                {team.logo ? (
                                                     <Image src={team.logo} alt={`${team.name} logo`} width={40} height={40} className="rounded-full" />
                                                ) : (
                                                    <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                                                        <Users className="h-5 w-5" />
                                                    </div>
                                                )}
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
                 <div className="text-center mt-8">
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
                        <LogOut className="mr-2 h-4 w-4"/>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
