
"use client";

import React from 'react';
import type { Conversation } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { format, parseISO } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';

interface MessageListProps {
  conversations: Conversation[];
}

export function MessageList({ conversations }: MessageListProps) {
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [replyText, setReplyText] = React.useState("");

  const handleReply = (conversationId: string) => {
    console.log(`Replying to ${conversationId}: ${replyText}`);
    // Here you would typically send the reply to your backend
    setReplyingTo(null);
    setReplyText("");
  };

  if (conversations.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        <p>No messages found.</p>
      </div>
    );
  }

  return (
    <Accordion 
      type="single" 
      collapsible 
      className="w-full" 
      value={replyingTo || undefined}
      onValueChange={setReplyingTo}
    >
      {conversations.map((convo) => (
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
            <div className="mt-4 px-4">
              <Separator className="my-4" />
              <div className="space-y-2">
                <Textarea 
                  placeholder="Type your reply..." 
                  value={replyingTo === convo.id ? replyText : ""}
                  onChange={(e) => {
                    if (replyingTo !== convo.id) setReplyingTo(convo.id);
                    setReplyText(e.target.value)
                  }}
                  className="w-full"
                />
                <div className="flex justify-end">
                   <Button onClick={() => handleReply(convo.id)} disabled={!replyText}>
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
