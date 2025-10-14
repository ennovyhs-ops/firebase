
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { TeamEvent } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";

type AddEventFormProps = {
  onEventAdd: (event: TeamEvent) => void;
  setOpen: (open: boolean) => void;
  selectedDate?: Date;
};

export function AddEventForm({ onEventAdd, setOpen, selectedDate }: AddEventFormProps) {
  const [date, setDate] = React.useState<Date | undefined>(selectedDate);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent: TeamEvent = {
      id: `evt${Date.now()}`,
      title: formData.get("title") as string,
      type: formData.get("type") as "Practice" | "Game" | "Event",
      date: date ? format(date, "yyyy-MM-dd") : "",
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
    };
    onEventAdd(newEvent);
    setOpen(false);
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogDescription>
          Fill in the details for the new team event.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <ScrollArea className="h-96">
            <div className="space-y-4 p-6">
                <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" name="title" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="type">Event Type</Label>
                    <Select name="type" required>
                    <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Practice">Practice</SelectItem>
                        <SelectItem value="Game">Game</SelectItem>
                        <SelectItem value="Event">Event</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        />
                    </PopoverContent>
                    </Popover>
                </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input id="startTime" name="startTime" type="time" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input id="endTime" name="endTime" type="time" required />
                </div>
                </div>
                <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Add any extra details..."
                />
                </div>
            </div>
        </ScrollArea>
        <DialogFooter className="pt-4 border-t">
          <Button type="submit">Create Event</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
