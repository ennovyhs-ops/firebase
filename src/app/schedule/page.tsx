
"use client";

import React, { useState } from 'react';
import { schedule as initialSchedule } from '@/lib/data';
import { ScheduleItem } from '@/components/schedule-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import CoachLayout from '../coach/layout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ScheduleEvent } from '@/lib/types';

export default function SchedulePage() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const sortedSchedule = [...schedule].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent: ScheduleEvent = {
      id: `evt${schedule.length + 1}`,
      type: formData.get('type') as 'Practice' | 'Game' | 'Meeting' | 'Other',
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      location: formData.get('location') as string,
      details: formData.get('details') as string,
    };
    setSchedule(prev => [newEvent, ...prev]);
    setIsCreateOpen(false);
  };

  return (
    <CoachLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center">
             <Button asChild variant="ghost" size="icon" className="mr-2">
              <Link href="/dashboard">
                <ArrowLeft />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Team Schedule</h1>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>Fill out the details for the new team event.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Practice">Practice</SelectItem>
                      <SelectItem value="Game">Game</SelectItem>
                      <SelectItem value="Meeting">Meeting</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" required />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" name="time" type="time" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">Details / Description</Label>
                  <Textarea id="details" name="details" />
                </div>
                <DialogFooter>
                  <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                  <Button type="submit">Create Event</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
