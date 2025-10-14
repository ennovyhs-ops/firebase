
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
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, ArrowLeft, MessageSquarePlus, Reply } from "lucide-react";
import { players } from "../roster/data";
import { conversations as initialConversations, type Conversation } from "./data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, formatISO, parseISO } from "date-fns";
import { MultiSelectCombobox } from "@/components/ui/multi-select-combobox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function ConversationDetails({
  conversation,
  onBack,
  onReply,
}: {
  conversation: Conversation;
  onBack: () => void;
  onReply: (conversationId: string, replyBody: string) => void;
}) {
  const [replyBody, setReplyBody] = useState("");
  const allMessages = [conversation, ...(conversation.replies || [])].sort(
    (a, b) => parseISO(a.timestamp).getTime() - parseISO(b.timestamp).getTime()
  );

  const handleReplySubmit = () => {
    if (replyBody.trim()) {
      onReply(conversation.id, replyBody);
      setReplyBody("");
    }
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft />
          </Button>
          <div>
            <CardTitle>{conversation.subject}</CardTitle>
            <CardDescription>
              To: {conversation.recipient}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-6 p-6">
          {allMessages.map((message, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                    <p className="font-semibold">{message.sender}</p>
                    <p className="text-xs text-muted-foreground">
                        {format(parseISO(message.timestamp), "PPP p")}
                    </p>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-sm">{message.body}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 border-t p-6">
        <div className="w-full space-y-2">
            <Label htmlFor="reply-message" className="font-semibold">Your Reply</Label>
            <Textarea
                id="reply-message"
                placeholder="Type your reply here..."
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                className="min-h-[100px]"
            />
        </div>
        <Button onClick={handleReplySubmit}>
            <Reply className="mr-2" />
            Send Reply
        </Button>
      </CardFooter>
    </Card>
  );
}

function ComposeMessageDialog({ onMessageSend }: { onMessageSend: (message: Conversation) => void; }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [recipients, setRecipients] = useState<string[]>([]);

  const recipientOptions = [
    { value: "entire-team", label: "Entire Team (Players & Parents)" },
    { value: "players-only", label: "Players Only" },
    { value: "parents-only", label: "Parents Only" },
    ...players.map((player) => ({
      value: player.id,
      label: `${player.firstName} ${player.lastName} (#${player.number})`,
    })),
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const subject = formData.get("subject") as string;
    const body = formData.get("message") as string;
    
    if (recipients.length === 0 || !subject || !body) {
         toast({
            variant: "destructive",
            title: "Missing fields",
            description: "Please select recipients and fill out all fields before sending.",
        });
        return;
    }

    const recipientLabels = recipients.map(r => recipientOptions.find(opt => opt.value === r)?.label || r);
    
    const newMessage: Conversation = {
        id: `msg${Date.now()}`,
        subject: subject,
        sender: 'Coach Steve',
        recipient: recipientLabels.join(', '),
        timestamp: formatISO(new Date()),
        body: body,
    }

    onMessageSend(newMessage);

    toast({
      title: "Message Sent!",
      description: "Your message has been successfully sent.",
    });
    (e.target as HTMLFormElement).reset();
    setRecipients([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <MessageSquarePlus className="mr-2" />
          Compose Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Compose New Message</DialogTitle>
          <DialogDescription>
            Send a message to your team members.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="recipients">Recipients</Label>
             <MultiSelectCombobox
                options={recipientOptions}
                placeholder="Select recipients..."
                searchPlaceholder="Search recipients..."
                emptyPlaceholder="No recipients found."
                value={recipients}
                onValueChange={setRecipients}
            />
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
          <DialogFooter>
            <Button type="submit">
              <Send className="mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function CommunicationPage() {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);

  const handleMessageSend = (message: Conversation) => {
    setConversations(prev => [message, ...prev]);
  }

  const handleReply = (conversationId: string, replyBody: string) => {
    const newReply: Conversation = {
        id: `reply${Date.now()}`,
        subject: `Re: ${selectedConversation?.subject}`,
        sender: 'Coach Steve', // Assuming the coach is always the one replying from this UI
        recipient: selectedConversation?.sender || '',
        timestamp: formatISO(new Date()),
        body: replyBody,
    };

    const updatedConversations = conversations.map(convo => {
        if (convo.id === conversationId) {
            const updatedConvo = { ...convo, replies: [...(convo.replies || []), newReply] };
            setSelectedConversation(updatedConvo);
            return updatedConvo;
        }
        return convo;
    });

    setConversations(updatedConversations);
  };


  if (selectedConversation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ConversationDetails
          conversation={selectedConversation}
          onBack={() => setSelectedConversation(null)}
          onReply={handleReply}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Messages"
      >
        <ComposeMessageDialog onMessageSend={handleMessageSend}/>
      </PageHeader>
      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="hidden sm:table-cell">To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conversations.map((convo) => (
                  <TableRow
                    key={convo.id}
                    onClick={() => setSelectedConversation(convo)}
                    className="cursor-pointer"
                  >
                    <TableCell className="text-xs text-muted-foreground py-2">
                      {format(parseISO(convo.timestamp), "MMM d")}
                    </TableCell>
                    <TableCell className="py-2">
                      <div className="font-medium">{convo.subject}</div>
                       <div className="text-xs text-muted-foreground">
                        From: {convo.sender}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell py-2">
                      {convo.recipient}
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
