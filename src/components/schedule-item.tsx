
"use client";

import type { ScheduleEvent } from '@/lib/types';
import { format, parse } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';

export function ScheduleItem({ event }: { event: ScheduleEvent }) {
    // The date string from data is treated as local time.
    // parseISO assumes UTC, use parse to handle local date strings 'yyyy-MM-dd'
    const eventDate = parse(event.date, 'yyyy-MM-dd', new Date());

    return (
        <div className="flex items-start gap-4">
            <div className="text-center w-16 flex-shrink-0">
                <p className="text-sm font-semibold text-primary">{format(eventDate, "MMM")}</p>
                <p className="text-3xl font-bold">{format(eventDate, "d")}</p>
                <p className="text-xs text-muted-foreground">{format(eventDate, "E")}</p>
            </div>
            <Card className="w-full">
                <CardContent className="p-4">
                    <h3 className="font-semibold">{event.type}</h3>
                    <p className="text-sm text-muted-foreground">{event.time} @ {event.location}</p>
                    <p className="text-sm mt-1">{event.details}</p>
                </CardContent>
            </Card>
        </div>
    );
}
