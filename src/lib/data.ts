

import type { User, Player, ScheduleEvent, Team } from './types';

export const users: Record<string, User> = {
    coach: { username: 'coach', password: 'coach123', name: 'Coach Johnson' },
    player1: { username: 'player1', password: 'player123', name: 'Alex Martinez' },
    player2: { username: 'player2', password: 'player123', name: 'Sam Chen' },
    parent1: { username: 'parent1', password: 'parent123', name: 'Maria Martinez', child: 'Alex Martinez' },
    parent2: { username: 'parent2', password: 'parent123', name: 'David Chen', child: 'Sam Chen' }
};

export const players: Player[] = [
    { name: 'Alex Martinez', position: 'Forward', number: '10', parent: 'Maria Martinez', email: 'maria@email.com', photo: 'https://picsum.photos/seed/p1/200' },
    { name: 'Sam Chen', position: 'Midfielder', number: '7', parent: 'David Chen', email: 'david@email.com', photo: 'https://picsum.photos/seed/p2/200' },
    { name: 'Jordan Smith', position: 'Defender', number: '5', parent: 'John Smith', email: 'john@email.com', photo: 'https://picsum.photos/seed/p3/200' },
    { name: 'Taylor Brown', position: 'Goalkeeper', number: '1', parent: 'Lisa Brown', email: 'lisa@email.com', photo: 'https://picsum.photos/seed/p4/200' },
    { name: 'Casey Davis', position: 'Forward', number: '11', parent: 'Mike Davis', email: 'mike@email.com', photo: 'https://picsum.photos/seed/p5/200' },
    { name: 'Morgan Lee', position: 'Midfielder', number: '8', parent: 'Sarah Lee', email: 'sarah@email.com', photo: 'https://picsum.photos/seed/p6/200' }
];

export const messages: string[] = [
    "From Coach Johnson (Just now) - To: all - Subject: Welcome to the Team!",
    "From Coach Johnson (2 hours ago) - Subject: Practice Tomorrow",
    "From Coach Johnson (1 day ago) - Subject: Game This Weekend",
    "From Coach Johnson (2 days ago) - Subject: Parent Meeting"
];

export const schedule: ScheduleEvent[] = [
    { id: '1', type: 'Practice', date: '2025-10-15', time: '16:00', location: 'Main Field', details: 'Regular team practice' },
    { id: '2', type: 'Game', date: '2025-10-18', time: '10:00', location: 'Eagles Stadium', details: 'Match vs Eagles' },
    { id: '3', type: 'Practice', date: '2025-10-20', time: '16:00', location: 'Main Field', details: 'Regular team practice' },
    { id: '4', type: 'Meeting', date: '2025-10-21', time: '18:00', location: 'Clubhouse', details: 'Parent meeting - Tournament discussion' }
];

export const teams: Team[] = [
    { id: 'u12-falcons', name: 'U-12 Falcons', sport: 'Soccer', logo: 'https://picsum.photos/seed/falcons/200' },
    { id: 'u14-eagles', name: 'U-14 Eagles', sport: 'Soccer', logo: 'https://picsum.photos/seed/eagles/200' },
    { id: 'varsity-hawks', name: 'Varsity Hawks', sport: 'Basketball', logo: 'https://picsum.photos/seed/hawks/200' }
];


// This is the data that was in communication/data.ts and schedule/data.ts
// I'm keeping it here to be re-integrated if needed.

export const conversations = [
  {
    id: "msg001",
    recipient: "All Players & Parents",
    subject: "Practice Canceled Today (April 29)",
    body: "Hi Team,\n\nDue to the heavy rain and waterlogged fields, we're canceling practice today, April 29th. Please stay safe and dry.\n\nWe'll see you at Wednesday's practice.\n\nThanks,\nCoach",
    timestamp: "2024-04-29T13:30:00Z"
  },
  {
    id: "msg002",
    recipient: "All Players",
    subject: "Skills Clinic This Saturday",
    body: "Hi Players,\n\nReminder that we have a special skills clinic this Saturday from 10 AM to 12 PM at the main field. We'll be focusing on dribbling and shooting drills. Come ready to work hard!\n\nBest,\nCoach",
    timestamp: "2024-04-28T18:00:00Z"
  },
  {
    id: "msg003",
    recipient: "All Parents",
    subject: "Fundraiser Update & Volunteer Request",
    body: "Dear Parents,\n\nThank you to everyone who has participated in our car wash fundraiser! We've raised $500 so far. We still need a few more parent volunteers for this weekend's event. If you're available to help out for an hour or two, please sign up here: [link].\n\nYour support is greatly appreciated!\n\nThanks,\nCoach",
    timestamp: "2024-04-27T11:45:00Z"
  }
];

    