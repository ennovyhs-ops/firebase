
"use client";

import React from 'react';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Edit, Mail, Phone, Link as LinkIcon, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

export default function ProfilePage() {
    const { currentUser, setCurrentUser, players, selectedTeam, users } = useAppContext();
    
    // Find all children linked to this parent
    const linkedChildren = players.filter(p => p.parent === currentUser?.name);

    const handleLogout = () => {
        setCurrentUser(null);
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
                         <Avatar className="w-20 h-20 text-xl">
                            <AvatarImage src={`https://picsum.photos/seed/${currentUser?.username}/200`} alt={currentUser?.name} />
                            <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{currentUser?.name}</CardTitle>
                            <CardDescription>Parent/Guardian</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Contact Information</h3>
                            <div className="flex items-center gap-3">
                                <Mail className="size-5 text-muted-foreground" />
                                <span className="text-sm">{currentUser?.username}@example.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="size-5 text-muted-foreground" />
                                <span className="text-sm">(555) 000-1111</span>
                            </div>
                            <Button variant="outline" size="sm">
                                <Edit className="mr-2" />
                                Edit Profile
                            </Button>
                        </div>
                        <Separator className="my-6" />
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Account Actions</h3>
                             <div className="flex flex-col sm:flex-row gap-4">
                                <Button variant="destructive" onClick={handleLogout}>
                                    <LogOut className="mr-2" />
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Linked Children Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Linked Children</CardTitle>
                        <CardDescription>Manage your children's profiles.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {linkedChildren.length > 0 ? (
                            linkedChildren.map(child => (
                                <div key={child.id} className="p-4 border rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="w-16 h-16">
                                            <AvatarImage src={child.photo} alt={child.name} />
                                            <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold text-xl">{child.name}</p>
                                            <p className="text-sm text-muted-foreground">Team: {selectedTeam?.name || "Falcons"}</p>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Edit className="mr-2" />
                                        Edit {child.nickname || child.name.split(' ')[0]}'s Profile
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">No children linked to this account.</p>
                        )}
                        <Separator />
                        <div>
                             <h4 className="font-medium mb-2">Link another child</h4>
                            <div className="flex items-center gap-2">
                                <Input id="playerEmail" placeholder="Enter Player's Email" />
                                <Button>
                                    <LinkIcon className="mr-2" />
                                    Link
                                </Button>
                            </div>
                        </div>
                         <Separator />
                         <div className="flex justify-between items-center pt-4">
                            <div>
                                <h4 className="font-medium">Delete Account</h4>
                                <p className="text-sm text-muted-foreground">Permanently delete your account and unlink from children.</p>
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
