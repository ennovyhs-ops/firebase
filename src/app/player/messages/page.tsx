
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageList } from '@/components/message-list';
import { conversations } from '@/lib/data';

export default function MessagesPage() {
    const playerMessages = conversations.filter(c => c.recipient.includes("Player") || c.recipient.includes("All"));
    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Team Messages</CardTitle>
                </CardHeader>
                <CardContent>
                    <MessageList conversations={playerMessages} />
                </CardContent>
            </Card>
        </div>
    );
}
