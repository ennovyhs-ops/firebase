
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/context/app-context';
import { ScheduleItem } from '@/components/schedule-item';
import PlayerLayout from '../layout';

export default function SchedulePage() {
    const { schedule } = useAppContext();
    const sortedSchedule = [...schedule].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <PlayerLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold tracking-tight mb-8">Team Schedule</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {sortedSchedule.map(e => <ScheduleItem key={e.id} event={e} />)}
                        {sortedSchedule.length === 0 && <p className="text-muted-foreground text-center py-8">No events scheduled.</p>}
                    </CardContent>
                </Card>
            </div>
        </PlayerLayout>
    );
}
