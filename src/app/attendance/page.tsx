
"use client";

import * as React from "react";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { players } from "../roster/data";
import { schedule } from "../schedule/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { AttendanceStatus, Player, TeamEvent } from "@/lib/types";
import { format } from "date-fns";

function AttendanceSheet({ eventId }: { eventId: string }) {
  const [attendance, setAttendance] = React.useState<
    Record<string, AttendanceStatus>
  >(() =>
    players.reduce((acc, player) => {
      acc[player.id] = "Pending";
      return acc;
    }, {} as Record<string, AttendanceStatus>)
  );

  const handleStatusChange = (playerId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({ ...prev, [playerId]: status }));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead className="w-[150px] text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => {
          const avatar = PlaceHolderImages.find(p => p.id === player.avatarId);
          return (
            <TableRow key={player.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint} />
                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{player.name}</div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Select
                  value={attendance[player.id]}
                  onValueChange={(value) =>
                    handleStatusChange(player.id, value as AttendanceStatus)
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Set status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Present">Present</SelectItem>
                    <SelectItem value="Absent">Absent</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default function AttendancePage() {
  const allEvents = schedule.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(allEvents[0]?.id || null);

  const selectedEvent = allEvents.find(event => event.id === selectedEventId);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Attendance Tracking"
        description="Mark and review player attendance for all team events."
      />
      <div className="mt-8 space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Select Event</CardTitle>
                <CardDescription>Choose an event to view or manage attendance.</CardDescription>
            </CardHeader>
            <CardContent>
                <Select onValueChange={setSelectedEventId} value={selectedEventId ?? undefined}>
                    <SelectTrigger className="w-full md:w-1/2">
                        <SelectValue placeholder="Select an event..." />
                    </SelectTrigger>
                    <SelectContent>
                        {allEvents.map(event => (
                            <SelectItem key={event.id} value={event.id}>
                                {event.title} - {format(new Date(event.date), "MMM d, yyyy")}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>

        {selectedEvent && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedEvent.title}</CardTitle>
                <CardDescription>
                  {format(new Date(selectedEvent.date), "EEEE, MMMM d, yyyy")} @ {selectedEvent.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AttendanceSheet eventId={selectedEvent.id} />
              </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
