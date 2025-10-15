
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAppContext } from '@/context/app-context';
import type { Player } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Calendar, MessageSquare, Users, User } from 'lucide-react';
import { ScheduleItem } from '@/components/schedule-item';
import { conversations } from '@/lib/data';
import { MessageList } from '@/components/message-list';

type Tab = 'schedule' | 'messages' | 'team' | 'profile';

function PlayerCard({ name, position, number }: { name: string, position: string, number: string }) {
    return (
        <Card className="text-center">
            <CardContent className="p-4">
                <Avatar className="mx-auto mb-4 w-20 h-20">
                    <AvatarFallback className="text-3xl font-bold">{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-bold text-lg">{name}</p>
                <p className="text-sm text-muted-foreground">#{number} | {position}</p>
            </CardContent>
        </Card>
    );
}


export default function PlayerDashboard() {
    const { currentUser, setCurrentUser, players, setPlayers, schedule } = useAppContext();
    const [activeTab, setActiveTab] = useState<Tab>('schedule');
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const handleEditProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const position = formData.get('position') as string;
        const number = formData.get('number') as string;

        if (currentUser) {
            const updatedPlayers = players.map(p => {
                if (p.name === currentUser.name) {
                    return { ...p, name, position, number };
                }
                return p;
            });
            setPlayers(updatedPlayers);
            setCurrentUser({ ...currentUser, name });
            setIsEditProfileOpen(false);
            alert('Profile updated successfully!');
        }
    };
    
    const currentPlayerInfo = players.find(p => p.name === currentUser?.name);

    const tabs: { id: Tab; label: string, icon: React.ElementType }[] = [
        { id: 'schedule', label: 'Schedule', icon: Calendar },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'profile', label: 'My Profile', icon: User },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'schedule':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Events</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {schedule.map(e => <ScheduleItem key={e.id} event={e} />)}
                            {schedule.length === 0 && <p className="text-muted-foreground text-center py-8">No events scheduled.</p>}
                        </CardContent>
                    </Card>
                );
            case 'messages':
                return (
                     <Card>
                        <CardHeader>
                            <CardTitle>Team Messages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <MessageList conversations={conversations.filter(c => c.recipient.includes("Player"))} />
                        </CardContent>
                    </Card>
                );
            case 'team':
                return (
                     <Card>
                        <CardHeader>
                            <CardTitle>Team Roster</CardTitle>
                        </CardHeader>
                        <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {players.map((p, i) => <PlayerCard key={i} name={p.name} position={p.position} number={p.number} />)}
                        </CardContent>
                    </Card>
                );
            case 'profile':
                return currentPlayerInfo ? (
                    <Card className="max-w-md mx-auto">
                         <CardHeader>
                            <CardTitle>Player Information</CardTitle>
                            <CardDescription>View and edit your profile details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex items-center justify-center">
                                <Avatar className="w-24 h-24 text-4xl">
                                    <AvatarFallback>{currentPlayerInfo.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <p className="font-semibold">{currentPlayerInfo.name}</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Position</Label>
                                <p className="font-semibold">{currentPlayerInfo.position}</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Jersey Number</Label>
                                <p className="font-semibold">#{currentPlayerInfo.number}</p>
                            </div>
                            <Button onClick={() => setIsEditProfileOpen(true)} className="w-full">Edit Profile</Button>
                        </CardContent>
                    </Card>
                ) : (
                    <p className="text-muted-foreground text-center py-8">Could not find your player information.</p>
                );
            default:
                return null;
        }
    }


    return (
        <div className="container mx-auto p-4">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 mb-6 border-b">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Welcome, {currentUser?.name}</h1>
                    <p className="text-sm text-muted-foreground">Player Dashboard</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="mt-4 sm:mt-0">
                    <LogOut className="mr-2" />
                    Logout
                </Button>
            </header>

            <div className="flex justify-center border-b mb-6">
                 <div className="flex space-x-1">
                    {tabs.map(tab => (
                        <Button 
                            key={tab.id}
                            variant={activeTab === tab.id ? 'default' : 'ghost'}
                            className={`whitespace-nowrap transition-all duration-300`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <tab.icon className="mr-2" />
                            {tab.label}
                        </Button>
                    ))}
                </div>
            </div>

            <main>
                {renderContent()}
            </main>

            <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Update your profile information. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    {currentPlayerInfo && (
                        <form onSubmit={handleEditProfile} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Name</Label>
                                <Input id="edit-name" name="name" defaultValue={currentPlayerInfo.name} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-position">Position</Label>
                                <Input id="edit-position" name="position" defaultValue={currentPlayerInfo.position} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-number">Jersey Number</Label>
                                <Input id="edit-number" name="number" defaultValue={currentPlayerInfo.number} required />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

        </div>
    );
}
