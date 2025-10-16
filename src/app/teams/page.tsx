
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/app-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ChevronRight, LogOut, PlusCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TeamSelectionPage() {
    const { teams, setSelectedTeam, currentUser, setCurrentUser, setTeams } = useAppContext();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isJoinOpen, setIsJoinOpen] = useState(false);

    const handleLogout = () => {
        setSelectedTeam(null);
        setCurrentUser(null);
    };

    const handleCreateTeam = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const teamName = formData.get('teamName') as string;
        const newTeam = {
            id: `team-${Date.now()}`,
            name: teamName,
            sport: 'Sport', // You might want a way to select this
            logo: `https://picsum.photos/seed/${teamName}/200`
        };
        setTeams(prev => [...prev, newTeam]);
        setIsCreateOpen(false);
    };

    const handleJoinTeam = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Join team logic would go here
        alert('Join team functionality not yet implemented.');
        setIsJoinOpen(false);
    };


    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                 <header className="text-center pb-4 mb-6">
                    <h1 className="text-2xl font-bold text-primary">Welcome, {currentUser?.name}</h1>
                    <p className="text-sm text-muted-foreground">Please select a team to manage or create a new one.</p>
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
                            <p className="text-muted-foreground">You are not part of any teams yet.</p>
                        </CardContent>
                    </Card>
                )}

                <div className="flex justify-center gap-4 mt-8">
                     <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <PlusCircle className="mr-2" />
                                Create New Team
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create a New Team</DialogTitle>
                                <DialogDescription>Enter the name for your new team.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateTeam}>
                                <div className="space-y-2 py-4">
                                    <Label htmlFor="teamName">Team Name</Label>
                                    <Input id="teamName" name="teamName" required />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                                    <Button type="submit">Create Team</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isJoinOpen} onOpenChange={setIsJoinOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2" />
                                Join Team
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Join an Existing Team</DialogTitle>
                                <DialogDescription>Enter the 8-character code provided by the team's coach.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleJoinTeam}>
                                <div className="space-y-2 py-4">
                                    <Label htmlFor="joinCode">Team Code</Label>
                                    <Input id="joinCode" name="joinCode" required maxLength={8} />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                                    <Button type="submit">Request to Join</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>


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
