
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAppContext } from '@/context/app-context';
import { LogOut, Calendar, MessageSquare, User, Shield } from 'lucide-react';
import { ScheduleItem } from '@/components/schedule-item';
import { conversations } from '@/lib/data';
import { MessageList } from '@/components/message-list';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


type Tab = 'schedule' | 'messages' | 'child';


export default function ParentDashboard() {
    const { currentUser, setCurrentUser, players, messages, schedule } = useAppContext();
    const [activeTab, setActiveTab] = useState<Tab>('schedule');

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const relevantMessages = conversations.filter(c => c.recipient.includes("Parent"));
    const child = players.find(p => p.parent === currentUser?.name);

    const tabs: { id: Tab; label: string, icon: React.ElementType }[] = [
        { id: 'schedule', label: 'Schedule', icon: Calendar },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'child', label: 'My Child', icon: Shield },
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
                            <MessageList conversations={relevantMessages} />
                        </CardContent>
                    </Card>
                );
            case 'child':
                 return child ? (
                    <Card className="max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle>Player Information</CardTitle>
                            <CardDescription>Details for {child.name}.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <Avatar className="w-24 h-24 mx-auto mb-4 text-4xl">
                                <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-bold text-2xl">{child.name}</p>
                            <p className="text-md text-muted-foreground">Position: {child.position}</p>
                            <p className="text-md text-muted-foreground">Number: #{child.number}</p>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardContent className="p-10 text-center">
                            <p className="text-muted-foreground">Could not find child information.</p>
                        </CardContent>
                    </Card>
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
                    <p className="text-sm text-muted-foreground">Parent/Guardian Dashboard</p>
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
        </div>
    );
}

