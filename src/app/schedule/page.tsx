"use client";
import * as React from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { schedule as initialSchedule } from "./data";
import { PlusCircle, Pin } from "lucide-react";
import { format, isSameDay } from "date-fns";
import type { TeamEvent } from "@/lib/types";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddEventForm } from "./add-event-form";

export default function SchedulePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [open, setOpen] = React.useState(false);
  const [schedule, setSchedule] = React.useState(initialSchedule);

  const handleEventAdd = (event: TeamEvent) => {
    // NOTE: This only adds the event to the client-side state.
    // The data is not persisted.
    setSchedule((prev) => [...prev, event].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    console.log("New event added:", event);
    // If the new event is on the currently selected day, we don't need to do anything.
    // If not, we might want to switch the calendar to the new event's date.
    if (date && !isSameDay(new Date(event.date), date)) {
        setDate(new Date(event.date));
    }
  };

  const eventsOnSelectedDay = React.useMemo(() => {
    if (!date) return [];
    return schedule.filter((event) => isSameDay(new Date(event.date), date));
  }, [date, schedule]);

  const eventDays = React.useMemo(() => {
      return schedule.map((event) => new Date(event.date));
  }, [schedule]);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Team Schedule"
        description="Manage all practices, games, and team events."
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 size-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <AddEventForm onEventAdd={handleEventAdd} setOpen={setOpen} selectedDate={date} />
        </Dialog>
      </PageHeader>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-1">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
                modifiers={{ event: eventDays }}
                modifiersClassNames={{ event: "bg-primary/20 rounded-full" }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card className="min-h-full">
            <CardHeader>
              <CardTitle>
                Events for {date ? format(date, "MMMM d, yyyy") : "..."}
              </CardTitle>
              <CardDescription>
                {eventsOnSelectedDay.length} event(s) scheduled for this day.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {eventsOnSelectedDay.length > 0 ? (
                <ul className="space-y-4">
                  {eventsOnSelectedDay.map((event: TeamEvent) => (
                    <li key={event.id} className="rounded-lg border p-4">
                      <p className="font-semibold text-primary">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.startTime} - {event.endTime}
                      </p>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <Pin className="size-3" />
                        <span>{event.location}</span>
                      </div>
                      {event.description && (
                        <p className="text-sm mt-2">{event.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed">
                  <p className="text-center text-muted-foreground">
                    No events scheduled for this day.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
