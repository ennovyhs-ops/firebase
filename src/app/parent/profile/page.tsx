
"use client";

import React from 'react';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ParentLayout from '../layout';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
    const { currentUser, setCurrentUser, players, selectedTeam } = useAppContext();
    const child = players.find(p => p.parent === currentUser?.name);

    const handleLogout = () => {
        setCurrentUser(null);
    };

    return (
        <ParentLayout>
            <div className="container mx-auto px-4 py-8">
                 <div className="grid gap-8 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Profile</CardTitle>
                            <CardDescription>Your personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <p className="font-semibold">{currentUser?.name}</p>
                            </div>
                             <div className="space-y-2">
                                <Label>Role</Label>
                                <p className="font-semibold">Parent</p>
                            </div>
                            <Separator />
                            <Button variant="destructive" onClick={handleLogout}>
                                <LogOut className="mr-2" />
                                Logout
                            </Button>
                        </CardContent>
                    </Card>

                    {child && (
                         <Card>
                            <CardHeader>
                                <CardTitle>My Child</CardTitle>
                                <CardDescription>Information for {child.name}.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <div className="flex items-center gap-4">
                                     {child.photo && <Avatar className="w-16 h-16"><AvatarImage src={child.photo} alt={child.name} /></Avatar>}
                                     <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                                    <div>
                                        <p className="font-bold text-xl">{child.name}</p>
                                        <p className="text-md text-muted-foreground">Team: {selectedTeam?.name || "N/A"}</p>
                                    </div>
                               </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label>Position</Label>
                                    <p className="font-semibold">{child.position}</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Jersey Number</Label>
                                    <p className="font-semibold">#{child.number}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                 </div>
            </div>
        </ParentLayout>
    );
}
