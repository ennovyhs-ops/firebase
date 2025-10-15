
"use client";

import React from 'react';
import type { Conversation } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { format, parseISO } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface MessageListProps {
  conversations: Conversation[];
}

export function MessageList({ conversations }: MessageListProps) {
  const sortedConversations = React.useMemo(() => {
    const validConversations = conversations.filter(c => c.timestamp && !isNaN(parseISO(c.timestamp).getTime()));
    return validConversations.sort((a, b) => parseISO(b.timestamp!).getTime() - parseISO(a.timestamp!).getTime());
  }, [conversations]);

  if (sortedConversations.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        <p>No messages found.</p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {sortedConversations.map((convo) => (
        <AccordionItem value={convo.id} key={convo.id}>
          <AccordionTrigger>
            <div className="flex items-center gap-4 w-full">
              <Avatar>
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
              <div className="flex-grow text-left">
                <p className="font-medium">{convo.subject}</p>
                <p className="text-sm text-muted-foreground">
                  To: {Array.isArray(convo.recipient) ? convo.recipient.join(', ') : convo.recipient}
                </p>
              </div>
              <p className="text-sm text-muted-foreground hidden md:block">
                {convo.timestamp ? format(parseISO(convo.timestamp), 'MMM d, yyyy') : ''}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="whitespace-pre-wrap px-4 py-2 bg-muted/50 rounded-md">
              {convo.body}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
