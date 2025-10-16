
"use client";

import React, { useState } from 'react';
import { conversations as allConversations } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { MessageList } from '@/components/message-list';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function MessagesPage() {
    const [conversations, setConversations] = useState(allConversations.filter(c => c.recipient.toString().toLowerCase().includes("parent") || c.recipient.toString().toLowerCase().includes("everyone")));
    const [isComposeOpen, setIsComposeOpen] = useState(false);

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const subject = formData.get('subject') as string;
        const body = formData.get('body') as string;
        const recipients = formData.get('recipients') as string;

        const newMessage = {
            id: `msg${conversations.length + 1}`,
            subject,
            body,
            recipient: [recipients],
            timestamp: new Date().toISOString(),
        };

        setConversations(prev => [newMessage, ...prev]);
        setIsComposeOpen(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
                <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            New Message
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Compose Message</DialogTitle>
                            <DialogDescription>Send a message to the coach.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSendMessage} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="recipients">Recipient</Label>
                                <Select name="recipients" required defaultValue="coach">
                                    <SelectTrigger id="recipients">
                                        <SelectValue placeholder="Select a recipient" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="coach">Coach</SelectItem>
                                        <SelectItem value="everyone">Everyone</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" name="subject" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="body">Message</Label>
                                <Textarea id="body" name="body" required rows={6} />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                                <Button type="submit">Send Message</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Team Messages</CardTitle>
                </CardHeader>
                <CardContent>
                    <MessageList conversations={conversations} />
                </CardContent>
            </Card>
        </div>
    );
}
