
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/context/app-context';
import type { Message, ScheduleEvent } from '@/lib/types';

type Tab = 'dashboard' | 'players' | 'messages' | 'schedule' | 'send';

function PlayerCard({ name, position, number, parent, email }: { name: string, position: string, number: string, parent: string, email: string }) {
    return (
        <Card className="text-center bg-white shadow-lg rounded-xl">
            <CardContent className="p-6">
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                    {name.charAt(0)}
                </div>
                <p className="font-bold text-lg">{name}</p>
                <p className="text-sm text-muted-foreground">Position: {position}</p>
                <p className="text-sm text-muted-foreground">Number: #{number}</p>
                <p className="text-sm text-muted-foreground mt-2">Parent: {parent}</p>
                <p className="text-sm text-muted-foreground">{email}</p>
            </CardContent>
        </Card>
    );
}

function MessageCard({ from, time, subject, body }: Message) {
    return (
        <Card className="mb-3 bg-white shadow-md">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-base">{subject}</CardTitle>
                    <p className="text-xs text-muted-foreground">{time}</p>
                </div>
                <CardDescription>From: {from}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm">{body}</p>
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
    const { currentUser, setCurrentUser, players, messages, setMessages, schedule, setSchedule } = useAppContext();
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [showAddEventForm, setShowAddEventForm] = useState(false);

    const handleLogout = () => {
        setCurrentUser(null);
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

        const newMessage: Message = {
            from: currentUser?.name || 'Coach',
            to,
            subject,
            body,
            time: 'Just now'
        };

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

    const tabs: { id: Tab; label: string }[] = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'players', label: 'Players' },
        { id: 'messages', label: 'Messages' },
        { id: 'schedule', label: 'Schedule' },
        { id: 'send', label: 'Send Message' },
    ];
    
    return (
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-2xl">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 mb-6 border-b-2">
                <div>
                    <h1 className="text-2xl font-bold text-primary">{currentUser?.name}'s Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Head Coach</p>
                </div>
                <Button variant="secondary" size="sm" onClick={handleLogout} className="mt-4 sm:mt-0">Logout</Button>
            </header>

            <div className="flex space-x-1 border-b-2 mb-6 overflow-x-auto">
                {tabs.map(tab => (
                    <Button 
                        key={tab.id}
                        variant="ghost"
                        className={`whitespace-nowrap rounded-none text-muted-foreground transition-all duration-300 border-b-4 ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent'}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>

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
                            <CardHeader>
                                <div className="flex justify-between">
                                    <CardTitle className="text-md">Message Sent: {msg.subject}</CardTitle>
                                    <p className="text-xs text-muted-foreground">{msg.time}</p>
                                </div>
                                <CardDescription>Sent to: {msg.to}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                    {messages.length === 0 && <p className="text-muted-foreground text-center py-8">No recent activity.</p>}
                </div>
            </div>

            <div className={activeTab === 'players' ? 'block' : 'hidden'}>
                <h2 className="text-xl font-bold mb-4">Team Roster</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {players.map((p, i) => <PlayerCard key={i} {...p} />)}
                </div>
            </div>

            <div className={activeTab === 'messages' ? 'block' : 'hidden'}>
                <h2 className="text-xl font-bold mb-4">All Messages</h2>
                <div>
                    {messages.map((msg, i) => <MessageCard key={i} {...msg} />)}
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
    );
}
