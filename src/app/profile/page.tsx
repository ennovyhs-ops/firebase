
"use client";

import React from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, SwitchCamera, User, Mail, Phone, Edit } from 'lucide-react';
import CoachLayout from '../coach/layout';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
    const { currentUser, setCurrentUser, setSelectedTeam } = useAppContext();

    const handleLogout = () => {
        setCurrentUser(null);
        setSelectedTeam(null);
    };

    const handleSwitchTeam = () => {
        setSelectedTeam(null);
    };

    return (
        <CoachLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
                </div>

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
            </div>
        </CoachLayout>
    );
}
