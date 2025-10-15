
"use client";

import React, { useState, useMemo } from 'react';
import { conversations as allConversations } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MessageList } from '@/components/message-list';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { parseISO } from 'date-fns';
import CoachLayout from '../coach/layout';

export default function CommunicationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterGroup, setFilterGroup] = useState("all");

  const filteredAndSortedConversations = useMemo(() => {
    let conversations = [...allConversations].filter(c => c.timestamp && !isNaN(parseISO(c.timestamp).getTime()));

    // Filter by group
    if (filterGroup !== "all") {
        conversations = conversations.filter(convo => {
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

    // Filter by search term
    if (searchTerm) {
      conversations = conversations.filter(convo => 
        convo.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convo.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    conversations.sort((a, b) => {
      const dateA = parseISO(a.timestamp!).getTime();
      const dateB = parseISO(b.timestamp!).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return conversations;
  }, [searchTerm, sortOrder, filterGroup]);
  
  return (
    <CoachLayout>
        <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
            <Button asChild variant="ghost" size="icon">
            <Link href="/dashboard">
                <ArrowLeft />
            </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight ml-2">Communication</h1>
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
