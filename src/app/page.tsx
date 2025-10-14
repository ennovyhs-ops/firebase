
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
import { conversations } from "./communication/data";

export default function Home() {
  const nextEvent = schedule.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  const latestConversations = conversations.sort((a,b) => parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime()).slice(0,3);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Welcome Back, Coach!"
      />
      <div className="mt-8 grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-7">
           <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-accent text-accent-foreground p-3 rounded-full">
                <CalendarDays className="size-6" />
              </div>
              <div>
                <CardTitle>Next Up</CardTitle>
                <CardDescription>Your next scheduled event</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {nextEvent ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary">{nextEvent.title} ({nextEvent.type})</h3>
                  <p className="text-muted-foreground">
                    {format(new Date(nextEvent.date), "EEEE, MMMM d, yyyy")} from {nextEvent.startTime} to {nextEvent.endTime}
                  </p>
                  <p className="text-sm">{nextEvent.location}</p>
                </div>
                <Button asChild>
                  <Link href="/schedule">
                    View Full Schedule <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <p>No upcoming events.</p>
            )}
          </CardContent>
        </Card>
        <Card className="md:col-span-5">
           <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-accent text-accent-foreground p-3 rounded-full">
                <Users className="size-6" />
              </div>
              <div>
                <CardTitle>Team Roster</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-4xl font-bold">{players.length}</p>
                    <p className="font-semibold text-primary">Players</p>
                </div>
                 <Button asChild variant="secondary" className="w-full">
                  <Link href="/roster">
                    Manage Roster <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>

       <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2">
         <Card>
          <CardHeader>
             <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {latestConversations.map(convo => (
                    <div key={convo.id} className="text-sm">
                        <Link href={`/communication?id=${convo.id}`} className="font-medium text-primary hover:underline">
                            {convo.subject}
                        </Link>
                        <p className="text-xs text-muted-foreground">To: {convo.recipient}</p>
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
         <Card>
          <CardHeader>
             <CardTitle>Performance Analysis</CardTitle>
             <CardDescription>Get AI-powered insights.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button asChild className="w-full">
                  <Link href="/performance">
                    <BarChart3 className="mr-2 size-4"/> Analyze Performance
                  </Link>
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

