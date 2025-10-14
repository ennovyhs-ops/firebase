
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
import { Send, ArrowLeft, MessageSquarePlus } from "lucide-react";
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
import { Combobox } from "@/components/ui/combobox";

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
              To: {conversation.recipient} on{" "}
              {format(parseISO(conversation.timestamp), "PPP")}
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

function ComposeMessageDialog({ onMessageSend }: { onMessageSend: (message: Conversation) => void; }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState("");

  const recipientOptions = [
    { value: "Entire Team", label: "Entire Team (Players & Parents)" },
    { value: "Players Only", label: "Players Only" },
    { value: "Parents Only", label: "Parents Only" },
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
    
    if (!recipient || !subject || !body) {
         toast({
            variant: "destructive",
            title: "Missing fields",
            description: "Please fill out all fields before sending.",
        });
        return;
    }

    const recipientLabel = recipientOptions.find(opt => opt.value === recipient)?.label || recipient;
    
    const newMessage: Conversation = {
        id: `msg${Date.now()}`,
        subject: subject,
        sender: 'Coach Steve',
        recipient: recipientLabel,
        timestamp: formatISO(new Date()),
        body: body,
    }

    onMessageSend(newMessage);

    toast({
      title: "Message Sent!",
      description: "Your message has been successfully sent.",
    });
    (e.target as HTMLFormElement).reset();
    setRecipient("");
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
            <Combobox
              options={recipientOptions}
              placeholder="Select recipients..."
              searchPlaceholder="Search recipients..."
              emptyPlaceholder="No recipients found."
              value={recipient}
              onValueChange={setRecipient}
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
      >
        <ComposeMessageDialog onMessageSend={handleMessageSend}/>
      </PageHeader>
      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Previous Messages</CardTitle>
            <CardDescription>Review your past conversations.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead className="hidden sm:table-cell">To</TableHead>
                  <TableHead>Subject</TableHead>
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
                    <TableCell className="hidden sm:table-cell py-2">
                      {convo.recipient}
                    </TableCell>
                    <TableCell className="py-2">
                      <div className="font-medium">{convo.subject}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[150px] md:max-w-xs">
                        {convo.body}
                      </div>
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
