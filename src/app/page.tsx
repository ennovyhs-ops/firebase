
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  MessageSquare,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { schedule } from './schedule/data';
import { format, parseISO } from 'date-fns';
import { players } from "./roster/data";
import { conversations as initialConversations } from "./communication/data";

export default function Home() {
  const nextEvent = schedule.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  const conversations = initialConversations.sort((a,b) => parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime()).slice(0,3);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Welcome Back, Coach!"
      />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
           <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-accent text-accent-foreground p-3 rounded-full">
                <CalendarDays className="size-6" />
              </div>
              <CardTitle>Next Up</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {nextEvent ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary">{nextEvent.title} ({nextEvent.type})</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(nextEvent.date), "EEE, MMM d")} @ {nextEvent.startTime}
                  </p>
                  <p className="text-sm">{nextEvent.location}</p>
                </div>
                <Button asChild size="sm">
                  <Link href="/schedule">
                    View Schedule <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <p>No upcoming events.</p>
            )}
          </CardContent>
        </Card>
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader>
             <div className="flex items-center gap-4">
              <div className="bg-accent text-accent-foreground p-3 rounded-full">
                <MessageSquare className="size-6" />
              </div>
              <CardTitle>Recent Messages</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
                {conversations.map(convo => (
                    <div key={convo.id} className="text-sm">
                        <Link href={`/communication?id=${convo.id}`} className="font-medium text-primary hover:underline leading-tight">
                            {convo.subject}
                        </Link>
                        <p className="text-xs text-muted-foreground truncate">To: {convo.recipient}</p>
                    </div>
                ))}
            </div>
            <Button asChild variant="secondary" className="w-full mt-4">
                <Link href="/communication">
                View All Messages <ArrowRight className="ml-2 size-4" />
                </Link>
            </Button>
          </CardContent>
        </Card>
         <Card className="sm:col-span-2 lg:col-span-3">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="bg-accent text-accent-foreground p-3 rounded-full">
                    <BarChart3 className="size-6" />
                </div>
                <div className="flex-1">
                    <CardTitle>Performance Analysis</CardTitle>
                    <CardDescription>Get AI-powered insights from your team's game and player data.</CardDescription>
                </div>
                <Button asChild>
                    <Link href="/performance">
                        Analyze Performance <ArrowRight className="ml-2 size-4" />
                    </Link>
                </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
