
"use client";

import { PageHeader } from "@/components/page-header";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { players as allPlayers } from "../roster/data";
import { schedule as allSchedule } from "../schedule/data";
import { useTeam } from "@/context/team-context";
import React from "react";
import { TeamEvent } from "@/lib/types";
import { format, parseISO } from "date-fns";
import { AttendanceSheet } from "../schedule/attendance-sheet";


export default function AttendancePage() {
    const { selectedTeam } = useTeam();
    const [selectedEvent, setSelectedEvent] = React.useState<TeamEvent | null>(null);

    const teamPlayers = React.useMemo(() => {
        return allPlayers.filter(p => p.teamId === selectedTeam);
    }, [selectedTeam]);

    const teamSchedule = React.useMemo(() => {
        return allSchedule.filter(e => e.teamId === selectedTeam);
    }, [selectedTeam]);
    
    React.useEffect(() => {
        if(teamSchedule.length > 0) {
            setSelectedEvent(teamSchedule[0]);
        } else {
            setSelectedEvent(null);
        }
    }, [selectedTeam, teamSchedule]);

    return (
        <div className="container mx-auto px-4 py-8">
            <PageHeader title="Attendance Tracking" />

            <div className="mt-8">
                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <CardTitle>Attendance Sheet</CardTitle>
                         <div className="w-[300px]">
                            <Select
                                value={selectedEvent?.id}
                                onValueChange={(eventId) => {
                                    const event = teamSchedule.find(e => e.id === eventId);
                                    setSelectedEvent(event || null);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an event" />
                                </SelectTrigger>
                                <SelectContent>
                                    {teamSchedule.map(event => (
                                        <SelectItem key={event.id} value={event.id}>
                                            {format(parseISO(event.date), 'MMM d')} - {event.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                       {selectedEvent ? (
                         <AttendanceSheet eventId={selectedEvent.id} />
                       ) : (
                        <div className="flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed">
                            <p className="text-center text-muted-foreground">
                                No events for this team.
                            </p>
                        </div>
                       )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
