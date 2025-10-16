
"use client";

import React, { useState, useMemo } from 'react';
import { conversations as allConversations, players } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { MessageList } from '@/components/message-list';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { parseISO } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { MultiSelectCombobox } from '@/components/ui/multi-select-combobox';
import CoachLayout from '../coach/layout';

export default function CommunicationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterGroup, setFilterGroup] = useState("all");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [conversations, setConversations] = useState(allConversations);

  const recipientOptions = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'players', label: 'Players' },
    { value: 'parents', label: 'Parents' },
    ...players.map(p => ({ value: p.id, label: p.name })),
  ];

  const filteredAndSortedConversations = useMemo(() => {
    let convos = [...conversations];

    if (filterGroup !== "all") {
        convos = convos.filter(convo => {
            const recipients = Array.isArray(convo.recipient) ? convo.recipient.join(' ') : convo.recipient;
            if (filterGroup === 'players') {
                return recipients.toLowerCase().includes('player');
            }
            if (filterGroup === 'parents') {
                return recipients.toLowerCase().includes('parent');
            }
            return false;
        });
    }

    if (searchTerm) {
      convos = convos.filter(convo => 
        convo.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convo.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    convos.sort((a, b) => {
        const dateA = a.timestamp ? parseISO(a.timestamp).getTime() : 0;
        const dateB = b.timestamp ? parseISO(b.timestamp).getTime() : 0;
        
        let comparison = 0;
        if (sortOrder === 'newest') {
            comparison = dateB - dateA;
        } else {
            comparison = dateA - dateB;
        }
        
        if (comparison === 0) {
            return a.id.localeCompare(b.id);
        }
        
        return comparison;
    });

    return convos;
  }, [searchTerm, sortOrder, filterGroup, conversations]);
  
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const subject = formData.get('subject') as string;
    const body = formData.get('body') as string;
    const recipients = JSON.parse(formData.get('recipients') as string) as string[];

    const recipientLabels = recipients.map(r => {
        const option = recipientOptions.find(o => o.value === r);
        return option ? option.label : r;
    });

    const newMessage = {
        id: `msg${conversations.length + 1}`,
        subject,
        body,
        recipient: recipientLabels,
        timestamp: new Date().toISOString(),
    };

    setConversations(prev => [newMessage, ...prev]);
    setIsComposeOpen(false);
  };

  return (
    <CoachLayout>
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center">
                    <Button asChild variant="ghost" size="icon" className="mr-2">
                        <Link href="/dashboard">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">Communication</h1>
                </div>
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
                            <DialogDescription>Send a message to your team members.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSendMessage} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="recipients">Recipients</Label>
                                <MultiSelectCombobox
                                    options={recipientOptions}
                                    placeholder="Select recipients..."
                                    searchPlaceholder="Search..."
                                    emptyPlaceholder="No recipients found."
                                    value={[]}
                                    onValueChange={(values) => {
                                        const hiddenInput = document.getElementById('recipients-hidden') as HTMLInputElement;
                                        if(hiddenInput) hiddenInput.value = JSON.stringify(values);
                                    }}
                                />
                                <input type="hidden" name="recipients" id="recipients-hidden" defaultValue="[]" />
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
                    <CardTitle>All Messages</CardTitle>
                    <div className="mt-4 flex flex-col sm:flex-row gap-4">
                        <div className="flex-grow">
                            <Label htmlFor="search-messages" className="sr-only">Search</Label>
                            <Input 
                                id="search-messages"
                                placeholder="Search messages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <Label htmlFor="filter-group" className="sr-only">Filter by group</Label>
                                <Select value={filterGroup} onValueChange={setFilterGroup}>
                                <SelectTrigger id="filter-group" className="w-full">
                                    <SelectValue placeholder="Filter by group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Groups</SelectItem>
                                    <SelectItem value="players">Players Only</SelectItem>
                                    <SelectItem value="parents">Parents Only</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="sort-order" className="sr-only">Sort by</Label>
                                <Select value={sortOrder} onValueChange={setSortOrder}>
                                <SelectTrigger id="sort-order" className="w-full">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Date: Newest</SelectItem>
                                    <SelectItem value="oldest">Date: Oldest</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <MessageList conversations={filteredAndSortedConversations} />
                </CardContent>
            </Card>
        </div>
    </CoachLayout>
  );
}
