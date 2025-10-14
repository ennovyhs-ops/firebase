
"use client";

import * as React from "react";
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
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { AttendanceStatus } from "@/lib/types";

export function AttendanceSheet({ eventId }: { eventId: string }) {
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
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-4 text-primary">Attendance</h4>
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
            const playerName = `${player.firstName} ${player.lastName}`;
            return (
                <TableRow key={player.id}>
                <TableCell>
                    <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint} />
                        <AvatarFallback>{player.firstName.charAt(0)}{player.lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{playerName}</div>
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
    </div>
  );
}
