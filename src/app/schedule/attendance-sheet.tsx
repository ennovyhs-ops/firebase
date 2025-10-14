
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
import type { AttendanceStatus, PlayerAttendance } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function AttendanceSheet({ eventId }: { eventId: string }) {
  const [attendance, setAttendance] = React.useState<
    Record<string, PlayerAttendance>
  >(() =>
    players.reduce((acc, player) => {
      // Mock player-indicated status
      const indicatedStatuses: AttendanceStatus[] = ["Present", "Absent", "Pending"];
      const randomStatus = indicatedStatuses[Math.floor(Math.random() * 3)];
      acc[player.id] = {
        indicated: randomStatus,
        actual: randomStatus, 
      };
      return acc;
    }, {} as Record<string, PlayerAttendance>)
  );

  const handleStatusChange = (playerId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({ 
        ...prev, 
        [playerId]: {
            ...prev[playerId],
            actual: status
        } 
    }));
  };

  const getStatusVariant = (status: AttendanceStatus) => {
    switch (status) {
        case "Present": return "default";
        case "Absent": return "destructive";
        case "Excused": return "secondary";
        default: return "outline";
    }
  }

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-4 text-primary">Attendance</h4>
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Player</TableHead>
            <TableHead className="w-[120px] text-center hidden sm:table-cell">Indicated</TableHead>
            <TableHead className="w-[150px] text-right">Actual Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {players.map((player) => {
            const avatar = PlaceHolderImages.find(p => p.id === player.avatarId);
            const playerName = `${player.firstName} ${player.lastName}`;
            const playerAttendance = attendance[player.id];
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
                <TableCell className="text-center hidden sm:table-cell">
                    <Badge variant={getStatusVariant(playerAttendance.indicated)} className="w-[70px] justify-center">
                        {playerAttendance.indicated}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <Select
                    value={playerAttendance.actual}
                    onValueChange={(value) =>
                        handleStatusChange(player.id, value as AttendanceStatus)
                    }
                    >
                    <SelectTrigger className="w-[120px] ml-auto">
                        <SelectValue placeholder="Set status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Present">Present</SelectItem>
                        <SelectItem value="Absent">Absent</SelectItem>
                        <SelectItem value="Excused">Excused</SelectItem>
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

