
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAppContext } from '@/context/app-context';
import type { Message, ScheduleEvent } from '@/lib/types';

type Tab = 'schedule' | 'messages' | 'child';


function MessageCard({ message }: { message: string }) {
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
    d.setDate(d.getDate() + 1);
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


export default function ParentDashboard() {
    const { currentUser, setCurrentUser, players, messages, schedule } = useAppContext();
    const [activeTab, setActiveTab] = useState<Tab>('schedule');

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const relevantMessages = messages.filter(msg => msg.toLowerCase().includes('all') || msg.toLowerCase().includes('parents'));
    const child = players.find(p => p.parent === currentUser?.name);

    const tabs: { id: Tab; label: string }[] = [
        { id: 'schedule', label: 'Schedule' },
        { id: 'messages', label: 'Messages' },
        { id: 'child', label: 'My Child' },
    ];

    return (
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-2xl">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 mb-6 border-b-2">
                <div>
                    <h1 className="text-2xl font-bold text-primary">{currentUser?.name}'s Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Parent/Guardian</p>
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

            <div className={activeTab === 'schedule' ? 'block' : 'hidden'}>
                <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
                <div>
                    {schedule.map(e => <ScheduleItem key={e.id} {...e} />)}
                    {schedule.length === 0 && <p className="text-muted-foreground text-center py-8">No events scheduled.</p>}
                </div>
            </div>

            <div className={activeTab === 'messages' ? 'block' : 'hidden'}>
                <h2 className="text-xl font-bold mb-4">Team Messages</h2>
                <div>
                    {relevantMessages.map((msg, i) => <MessageCard key={i} message={msg} />)}
                    {relevantMessages.length === 0 && <p className="text-muted-foreground text-center py-8">No messages.</p>}
                </div>
            </div>

            <div className={activeTab === 'child' ? 'block' : 'hidden'}>
                <h2 className="text-xl font-bold mb-4">Player Information</h2>
                 {child ? (
                    <Card className="max-w-md mx-auto text-center bg-white shadow-lg rounded-xl">
                        <CardContent className="p-6">
                            <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-4xl font-bold">
                                {child.name.charAt(0)}
                            </div>
                            <p className="font-bold text-2xl">{child.name}</p>
                            <p className="text-md text-muted-foreground">Position: {child.position}</p>
                            <p className="text-md text-muted-foreground">Number: #{child.number}</p>
                        </CardContent>
                    </Card>
                ) : (
                    <p className="text-muted-foreground text-center py-8">Could not find child information.</p>
                )}
            </div>
        </div>
    );
}
