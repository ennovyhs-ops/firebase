
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
import { format } from 'date-fns';
import { players } from "./roster/data";

export default function Home() {
  const nextEvent = schedule.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

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
                <CardDescription>An overview of your players</CardDescription>
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
             <CardTitle>Communication</CardTitle>
             <CardDescription>Send updates to your team.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button asChild className="w-full">
                  <Link href="/communication">
                    <MessageSquare className="mr-2 size-4"/> Send a Message
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
