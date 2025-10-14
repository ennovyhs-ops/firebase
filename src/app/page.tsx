
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
import { conversations as initialConversations } from "./communication/data";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const upcomingEvents = schedule.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 2);
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
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={event.id}>
                      {index > 0 && <Separator className="my-3" />}
                      <div>
                        <h3 className="font-semibold text-primary leading-tight">{event.title} ({event.type})</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(event.date), "EEE, MMM d")} @ {event.startTime}
                        </p>
                        <p className="text-sm">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild size="sm" className="w-full">
                  <Link href="/schedule">
                    View Full Schedule <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            ) : (
                <div className="text-center text-muted-foreground py-4">
                    <p>No upcoming events.</p>
                </div>
            )}
          </CardContent>
        </Card>
        <Card>
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
         <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
                <div className="bg-accent text-accent-foreground p-3 rounded-full">
                    <BarChart3 className="size-6" />
                </div>
                <CardTitle>Performance Analysis</CardTitle>
            </div>
          </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
            <CardDescription>Get AI-powered insights from your team's game and player data.</CardDescription>
            <Button asChild className="w-full mt-4">
                <Link href="/performance">
                    Analyze Performance <ArrowRight className="ml-2 size-4" />
                </Link>
            </Button>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
