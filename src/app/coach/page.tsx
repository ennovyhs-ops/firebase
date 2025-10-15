
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/context/app-context';
import type { Message, ScheduleEvent, Player } from '@/lib/types';
import { Home, Users, MessageSquare, Calendar, Send, UserPlus, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


type Tab = 'dashboard' | 'players' | 'messages' | 'schedule' | 'send';

function MessageCard({ message, id }: { message: string, id: number }) {
    return (
        <Card className="mb-3 bg-white shadow-md">
            <CardContent className="p-4">
                <p className="text-sm">{message}</p>
            </CardContent>
        </Card>
    );
}

function ScheduleItem({ type, date, time, location, details }: Omit<ScheduleEvent, 'id'>) {
    const d = new Date(date);
    d.setDate(d.getDate() + 1); // fix off by one date
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'short' });

    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg mb-3 shadow-md">
            <div className="bg-primary text-white p-3 rounded-lg text-center w-16">
                <div className="text-2xl font-bold">{day}</div>
                <div className="text-xs">{month}</div>
            </div>
            <div className="flex-1">
                <p className="font-bold">{type}</p>
                <p className="text-sm text-muted-foreground">{time} - {location}</p>
                <p className="text-xs mt-1">{details}</p>
            </div>
        </div>
    );
}


export default function CoachDashboard() {
    const { currentUser, players, setPlayers, messages, setMessages, schedule, setSchedule, selectedTeam, setSelectedTeam } = useAppContext();
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [showAddEventForm, setShowAddEventForm] = useState(false);
    const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);

    const handleSwitchTeam = () => {
        setSelectedTeam(null);
    };

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const to = formData.get('to') as 'all' | 'players' | 'parents';
        const subject = formData.get('subject') as string;
        const body = formData.get('body') as string;

        if (!subject || !body) {
            alert('Please fill out all fields.');
            return;
        }

        const newMessage = `From ${currentUser?.name || 'Coach'} (Just now) - To: ${to} - Subject: ${subject}`;

        setMessages([newMessage, ...messages]);
        alert('Message sent!');
        e.currentTarget.reset();
    };
    
    const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newEvent: ScheduleEvent = {
            id: `evt${Date.now()}`,
            type: formData.get("type") as "Practice" | "Game" | "Meeting" | "Other",
            date: formData.get("date") as string,
            time: formData.get("time") as string,
            location: formData.get("location") as string,
            details: formData.get("details") as string,
        };

        if (!newEvent.date || !newEvent.time || !newEvent.location) {
            alert('Please fill in all required fields');
            return;
        }

        setSchedule([...schedule, newEvent].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        setShowAddEventForm(false);
        e.currentTarget.reset();
        alert('Event added successfully!');
    }

    const handleAddPlayer = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newPlayer: Player = {
            name: formData.get("name") as string,
            position: formData.get("position") as string,
            number: formData.get("number") as string,
            parent: formData.get("parent") as string,
            email: formData.get("email") as string,
        };

        if (!newPlayer.name || !newPlayer.position || !newPlayer.number || !newPlayer.parent || !newPlayer.email) {
            alert('Please fill in all fields for the new player.');
            return;
        }

        setPlayers([...players, newPlayer]);
        setIsAddPlayerOpen(false); // Close dialog on submit
        e.currentTarget.reset();
        alert('Player added successfully!');
    };

    const tabs: { id: Tab; label: string, icon: React.ElementType }[] = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'players', label: 'Players', icon: Users },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'schedule', label: 'Schedule', icon: Calendar },
        { id: 'send', label: 'Send', icon: Send },
    ];
    
    return (
        <div className="pb-24">
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-2xl">
                <header className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 mb-6 border-b-2">
                    <div>
                        <h1 className="text-2xl font-bold text-primary">{selectedTeam?.name}</h1>
                        <p className="text-sm text-muted-foreground">{currentUser?.name} - Head Coach</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleSwitchTeam} className="mt-4 sm:mt-0">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Switch Team
                    </Button>
                </header>

                <div className={activeTab === 'dashboard' ? 'block' : 'hidden'}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="stat-card text-center p-6 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                            <p className="text-4xl font-bold">{players.length}</p>
                            <p className="text-sm opacity-90">Total Players</p>
                        </div>
                        <div className="stat-card text-center p-6 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                            <p className="text-4xl font-bold">{schedule.length}</p>
                            <p className="text-sm opacity-90">Upcoming Events</p>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mt-8 mb-4">Recent Activity</h3>
                    <div>
                        {messages.slice(0, 3).map((msg, i) => (
                            <Card key={i} className="mb-4">
                                <CardContent className="p-4">
                                    <p className="text-sm">{msg}</p>
                                </CardContent>
                            </Card>
                        ))}
                        {messages.length === 0 && <p className="text-muted-foreground text-center py-8">No recent activity.</p>}
                    </div>
                </div>

                <div className={activeTab === 'players' ? 'block' : 'hidden'}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Team Roster</h2>
                        <Dialog open={isAddPlayerOpen} onOpenChange={setIsAddPlayerOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Add Player
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Player</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleAddPlayer} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Player Name</Label>
                                        <Input id="name" name="name" placeholder="e.g., Jane Doe" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="position">Position</Label>
                                            <Input id="position" name="position" placeholder="e.g., Forward" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="number">Jersey Number</Label>
                                            <Input id="number" name="number" type="text" placeholder="e.g., 23" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="parent">Parent/Guardian</Label>
                                        <Input id="parent" name="parent" placeholder="e.g., John Doe" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Parent's Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="e.g., john.doe@example.com" required />
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit">Add Player</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                     <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Player</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead className="text-center">#</TableHead>
                                        <TableHead>Parent/Guardian</TableHead>
                                        <TableHead>Email</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {players.map((player, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{player.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{player.position}</TableCell>
                                            <TableCell className="text-center">{player.number}</TableCell>
                                            <TableCell>{player.parent}</TableCell>
                                            <TableCell>{player.email}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className={activeTab === 'messages' ? 'block' : 'hidden'}>
                    <h2 className="text-xl font-bold mb-4">All Messages</h2>
                    <div>
                        {messages.map((msg, i) => <MessageCard key={i} message={msg} id={i} />)}
                        {messages.length === 0 && <p className="text-muted-foreground text-center py-8">No messages.</p>}
                    </div>
                </div>

                <div className={activeTab === 'schedule' ? 'block' : 'hidden'}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Team Schedule</h2>
                        <Button size="sm" onClick={() => setShowAddEventForm(true)}>+ Add Event</Button>
                    </div>
                    {showAddEventForm && (
                        <Card className="mb-6">
                            <CardHeader><CardTitle>Add New Event</CardTitle></CardHeader>
                            <CardContent>
                                <form onSubmit={handleAddEvent} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Event Type</Label>
                                        <Select name="type" required>
                                            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Practice">Practice</SelectItem>
                                                <SelectItem value="Game">Game</SelectItem>
                                                <SelectItem value="Meeting">Meeting</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Date</Label>
                                            <Input type="date" name="date" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Time</Label>
                                            <Input type="time" name="time" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Location</Label>
                                        <Input name="location" placeholder="Enter location" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Details</Label>
                                        <Textarea name="details" placeholder="Additional information..." />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button type="submit">Add Event</Button>
                                        <Button type="button" variant="secondary" onClick={() => setShowAddEventForm(false)}>Cancel</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}
                    <div>
                        {schedule.map(e => <ScheduleItem key={e.id} {...e} />)}
                        {schedule.length === 0 && <p className="text-muted-foreground text-center py-8">No events scheduled.</p>}
                    </div>
                </div>

                <div className={activeTab === 'send' ? 'block' : 'hidden'}>
                    <h2 className="text-xl font-bold mb-4">Send New Message</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSendMessage} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Send To</Label>
                                    <Select name="to" defaultValue="all">
                                        <SelectTrigger><SelectValue placeholder="Select recipients" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Players & Parents</SelectItem>
                                            <SelectItem value="players">All Players</SelectItem>
                                            <SelectItem value="parents">All Parents</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Subject</Label>
                                    <Input name="subject" placeholder="Message subject" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Message</Label>
                                    <Textarea name="body" placeholder="Type your message here..." />
                                </div>
                                <Button type="submit" className="w-full">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-t-lg md:hidden">
                <div className="flex justify-around">
                    {tabs.map(tab => (
                        <Button 
                            key={tab.id}
                            variant="ghost"
                            className={cn(
                                "flex flex-col items-center justify-center h-16 w-full rounded-none transition-colors duration-300",
                                activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
                            )}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <tab.icon className="h-6 w-6" />
                            <span className="text-xs">{tab.label}</span>
                        </Button>
                    ))}
                </div>
            </div>
             <div className="hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm border rounded-full shadow-lg p-1 z-10">
                {tabs.map(tab => (
                    <Button 
                        key={tab.id}
                        variant="ghost"
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300",
                            activeTab === tab.id ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                        )}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <tab.icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}
