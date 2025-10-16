
"use client";

import React from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, SwitchCamera, User, Mail, Phone, Edit, Trash2, Upload, KeyRound } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
    const { currentUser, setCurrentUser, selectedTeam, setSelectedTeam } = useAppContext();

    const handleLogout = () => {
        setCurrentUser(null);
        setSelectedTeam(null);
    };

    const handleSwitchTeam = () => {
        setSelectedTeam(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Profile Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Image src="https://picsum.photos/seed/coach/80" alt="Coach" width={80} height={80} className="rounded-full" />
                        <div>
                            <CardTitle className="text-2xl">{currentUser?.name}</CardTitle>
                            <CardDescription>Coach</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Contact Information</h3>
                            <div className="flex items-center gap-3">
                                <User className="size-5 text-muted-foreground" />
                                <span className="text-sm">{currentUser?.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="size-5 text-muted-foreground" />
                                <span className="text-sm">coach.j@example.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="size-5 text-muted-foreground" />
                                <span className="text-sm">(555) 123-4567</span>
                            </div>
                            <Button variant="outline" size="sm">
                                <Edit className="mr-2" />
                                Edit Profile
                            </Button>
                        </div>
                        <Separator className="my-6" />
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Actions</h3>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button variant="outline" onClick={handleSwitchTeam}>
                                    <SwitchCamera className="mr-2" />
                                    Switch Team
                                </Button>
                                <Button variant="destructive" onClick={handleLogout}>
                                    <LogOut className="mr-2" />
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Team Settings Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Team Settings</CardTitle>
                        <CardDescription>Manage settings for <span className="font-bold">{selectedTeam?.name}</span></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="teamName">Team Name</Label>
                            <Input id="teamName" defaultValue={selectedTeam?.name} />
                        </div>
                        <div className="space-y-2">
                            <Label>Team Logo</Label>
                            <div className="flex items-center gap-4">
                                 {selectedTeam?.logo && <Image src={selectedTeam.logo} alt="Team Logo" width={60} height={60} className="rounded-full" />}
                                 <Button variant="outline">
                                    <Upload className="mr-2" />
                                    Upload New Logo
                                </Button>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="joinCode">Team Join Code</Label>
                            <div className="flex items-center gap-2">
                                <Input id="joinCode" defaultValue="A8K2F9B1" readOnly className="font-mono bg-muted" />
                                <Button variant="secondary">
                                    <KeyRound className="mr-2" />
                                    Generate New
                                </Button>
                            </div>
                        </div>
                        <Separator />
                         <div className="flex justify-between items-center pt-4">
                            <div>
                                <h4 className="font-medium">Delete Team</h4>
                                <p className="text-sm text-muted-foreground">Permanently delete this team and all its data.</p>
                            </div>
                            <Button variant="destructive">
                                <Trash2 className="mr-2" />
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
