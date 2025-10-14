
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, ArrowLeft } from "lucide-react";
import { players } from "../roster/data";
import { conversations, type Conversation } from "./data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function ConversationDetails({
  conversation,
  onBack,
}: {
  conversation: Conversation;
  onBack: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft />
            </Button>
            <div>
                <CardTitle>{conversation.subject}</CardTitle>
                <CardDescription>
                To: {conversation.recipient} on {format(parseISO(conversation.timestamp), "PPP")}
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{conversation.body}</p>
      </CardContent>
    </Card>
  );
}

export default function CommunicationPage() {
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Your message has been successfully queued for delivery.",
    });
    (e.target as HTMLFormElement).reset();
  };

  if (selectedConversation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ConversationDetails
          conversation={selectedConversation}
          onBack={() => setSelectedConversation(null)}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Messages"
        description="Send announcements, schedule updates, and messages to your team."
      />
      <div className="mt-8 space-y-8">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="compose-message">
                <Card>
                    <AccordionTrigger className="p-6 w-full">
                        <div className="text-left">
                            <h3 className="text-lg font-medium">Compose Message</h3>
                            <p className="text-sm text-muted-foreground">
                                Click to expand and send a new message.
                            </p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="recipients">Recipients</Label>
                                <Select name="recipients" defaultValue="all">
                                <SelectTrigger id="recipients">
                                    <SelectValue placeholder="Select recipients" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectItem value="all">
                                        Entire Team (Players & Parents)
                                    </SelectItem>
                                    <SelectItem value="players">Players Only</SelectItem>
                                    <SelectItem value="parents">Parents Only</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                    {players.map((player) => (
                                        <SelectItem key={player.id} value={player.id}>
                                        {player.firstName} {player.lastName}
                                        </SelectItem>
                                    ))}
                                    </SelectGroup>
                                </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                id="subject"
                                name="subject"
                                placeholder="e.g., Practice Canceled"
                                required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                id="message"
                                name="message"
                                placeholder="Type your message here..."
                                className="min-h-[150px]"
                                required
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">
                                <Send className="mr-2 size-4" />
                                Send Message
                                </Button>
                            </div>
                            </form>
                        </CardContent>
                    </AccordionContent>
                </Card>
            </AccordionItem>
        </Accordion>

        <Card>
          <CardHeader>
            <CardTitle>Previous Messages</CardTitle>
            <CardDescription>Review your past conversations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead className="hidden sm:table-cell">To</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conversations.map((convo) => (
                  <TableRow
                    key={convo.id}
                    onClick={() => setSelectedConversation(convo)}
                    className="cursor-pointer"
                  >
                    <TableCell>
                      <div className="font-medium">{convo.subject}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[150px] md:max-w-xs">
                        {convo.body}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {convo.recipient}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {format(parseISO(convo.timestamp), "MMM d")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
