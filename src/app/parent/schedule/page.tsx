
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/context/app-context';
import { ScheduleItem } from '@/components/schedule-item';

export default function SchedulePage() {
    const { schedule } = useAppContext();
    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {schedule.map(e => <ScheduleItem key={e.id} event={e} />)}
                    {schedule.length === 0 && <p className="text-muted-foreground text-center py-8">No events scheduled.</p>}
                </CardContent>
            </Card>
        </div>
    );
}
