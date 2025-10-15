
"use client";

import React from 'react';
import { schedule } from '@/lib/data';
import { ScheduleItem } from '@/components/schedule-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CoachLayout from '../coach/layout';

export default function SchedulePage() {
  const sortedSchedule = [...schedule].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <CoachLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" size="icon">
            <Link href="/dashboard">
              <ArrowLeft />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight ml-2">Team Schedule</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedSchedule.length > 0 ? (
              <div className="space-y-4">
                {sortedSchedule.map((event) => (
                  <ScheduleItem key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-10">
                <p>No events scheduled.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CoachLayout>
  );
}
