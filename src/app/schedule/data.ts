import type { TeamEvent } from "@/lib/types";
import { addDays, formatISO, startOfToday } from "date-fns";

const today = startOfToday();

export const schedule: TeamEvent[] = [
  {
    id: "evt1",
    type: "Practice",
    title: "Morning Practice",
    date: formatISO(addDays(today, 2), { representation: 'date' }),
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    location: "Main Gym",
  },
  {
    id: "evt2",
    type: "Game",
    title: "Game vs. The Raptors",
    date: formatISO(addDays(today, 5), { representation: 'date' }),
    startTime: "07:00 PM",
    endTime: "09:00 PM",
    location: "City Arena",
    description: "Championship qualifier match. All players must arrive by 6:00 PM.",
  },
  {
    id: "evt3",
    type: "Practice",
    title: "Evening Scrimmage",
    date: formatISO(addDays(today, 9), { representation: 'date' }),
    startTime: "06:00 PM",
    endTime: "08:00 PM",
    location: "Main Gym",
  },
  {
    id: "evt4",
    type: "Event",
    title: "Team Dinner",
    date: formatISO(addDays(today, 12), { representation: 'date' }),
    startTime: "07:30 PM",
    endTime: "09:30 PM",
    location: "Luigi's Italian Restaurant",
    description: "Celebrating our recent win. Families are welcome.",
  },
  {
    id: "evt5",
    type: "Practice",
    title: "Skills & Drills",
    date: formatISO(addDays(today, 16), { representation: 'date' }),
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    location: "Main Gym",
  },
   {
    id: "evt6",
    type: "Game",
    title: "Away Game vs. The Giants",
    date: formatISO(addDays(today, 20), { representation: 'date' }),
    startTime: "05:00 PM",
    endTime: "07:00 PM",
    location: "Northwood High School",
    description: "Bus leaves from Main Gym at 3:00 PM sharp.",
  },
];
