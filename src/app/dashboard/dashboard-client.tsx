
"use client";

import React from "react";
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
  SwitchCamera,
} from "lucide-react";
import { schedule as allSchedule, conversations as allConversations } from '@/lib/data';
import { parseISO } from 'date-fns';
import { Separator } from "@/components/ui/separator";
import { ScheduleItem } from "@/components/schedule-item";
import { useAppContext } from "@/context/app-context";

export function DashboardClient() {
  const { setSelectedTeam } = useAppContext();

  const upcomingEvents = React.useMemo(() => {
    return allSchedule
        .filter(e => !isNaN(new Date(e.date).getTime()))
        .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 2);
  }, []);

  const conversations = React.useMemo(() => {
    return [...allConversations]
        .filter(c => c.timestamp && !isNaN(parseISO(c.timestamp).getTime()))
        .sort((a, b) => parseISO(b.timestamp!).getTime() - parseISO(a.timestamp!).getTime())
        .slice(0, 3);
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back, Coach!</h1>
            <p className="text-muted-foreground">Here's a summary of what's happening with your team.</p>
        </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
           <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-accent text-accent-foreground p-3 rounded-full">
                <CalendarDays className="size-6" />
              </div>
              <CardTitle>Next Up</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <React.Fragment key={event.id}>
                      {index > 0 && <Separator className="my-3" />}
                      <ScheduleItem event={event} />
                    </React.Fragment>
                  ))}
                </div>
                <Button asChild size="sm" className="w-full mt-4">
                  <Link href="/coach/schedule">
                    View Full Schedule <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            ) : (
                <div className="text-center text-muted-foreground py-4 flex-grow flex items-center justify-center">
                    <p>No upcoming events.</p>
                </div>
            )}
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
             <div className="flex items-center gap-4">
              <div className="bg-accent text-accent-foreground p-3 rounded-full">
                <MessageSquare className="size-6" />
              </div>
              <CardTitle>Recent Messages</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between">
            {conversations.length > 0 ? (
                 <div className="space-y-3">
                    {conversations.map(convo => (
                        <div key={convo.id} className="text-sm">
                            <Link href={`/coach/communication?id=${convo.id}`} className="font-medium text-primary hover:underline leading-tight">
                                {convo.subject}
                            </Link>
                            <p className="text-xs text-muted-foreground truncate">To: {Array.isArray(convo.recipient) ? convo.recipient.join(', ') : convo.recipient}</p>
                        </div>
                    ))}
                </div>
            ) : (
                 <div className="text-center text-muted-foreground py-4 flex-grow flex items-center justify-center">
                    <p>No recent messages.</p>
                </div>
            )}
            <Button asChild className="w-full mt-4">
                <Link href="/coach/communication">
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
      <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => setSelectedTeam(null)}>
              <SwitchCamera className="mr-2" />
              Switch Team
          </Button>
      </div>
    </div>
  );
}
