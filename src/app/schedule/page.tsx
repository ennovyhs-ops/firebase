
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
import { schedule as allSchedule } from "./data";
import { PlusCircle, Pin, ChevronDown } from "lucide-react";
import { format, isSameDay, parseISO } from "date-fns";
import type { TeamEvent } from "@/lib/types";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddEventForm } from "./add-event-form";
import { AttendanceSheet } from "./attendance-sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function SchedulePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [open, setOpen] = React.useState(false);
  const [schedule, setSchedule] = React.useState(allSchedule);
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleEventAdd = (event: TeamEvent) => {
    setSchedule((prev) => [...prev, event].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    if (date && !isSameDay(new Date(event.date), date)) {
        setDate(new Date(event.date));
    }
  };

  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(prevId => prevId === eventId ? null : eventId);
  }
  
  React.useEffect(() => {
    // When the selected day changes, clear the selected event
    setSelectedEventId(null);
  }, [date]);

  const eventsOnSelectedDay = React.useMemo(() => {
    if (!date) return [];
    return schedule.filter((event) => isSameDay(parseISO(event.date), date));
  }, [date, schedule]);

  const eventDays = React.useMemo(() => {
      return schedule.map((event) => parseISO(event.date));
  }, [schedule]);

  const selectedEvent = schedule.find(e => e.id === selectedEventId);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Team Schedule"
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle />
              <span className="hidden sm:inline">Create Event</span>
            </Button>
          </DialogTrigger>
          <AddEventForm onEventAdd={handleEventAdd} setOpen={setOpen} selectedDate={date} />
        </Dialog>
      </PageHeader>
      <div className="mt-8 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-1">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
                numberOfMonths={isMobile ? 1 : 2}
                modifiers={{ event: eventDays }}
                modifiersClassNames={{ event: "bg-primary/20 rounded-full font-semibold" }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
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
                  {eventsOnSelectedDay.map((event: TeamEvent) => {
                    const isSelected = selectedEventId === event.id;
                    return (
                    <li key={event.id} className="rounded-lg border">
                        <div className="p-4 cursor-pointer hover:bg-accent" onClick={() => handleEventSelect(event.id)}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-primary">{event.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {event.startTime} - {event.endTime}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm mt-1">
                                        <Pin className="size-3" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                <ChevronDown className={cn("size-5 text-muted-foreground transition-transform", isSelected && "rotate-180")} />
                            </div>
                            {event.description && (
                                <p className="text-sm mt-2">{event.description}</p>
                            )}
                        </div>
                      {isSelected && selectedEvent && (
                          <div className="border-t">
                            <AttendanceSheet eventId={selectedEvent.id} />
                          </div>
                      )}
                    </li>
                  )})}
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
