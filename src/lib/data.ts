
import type { User, Player, ScheduleEvent, Team, Conversation } from './types';

export const users: Record<string, User> = {
    coach: { username: 'coach', password: 'coach123', name: 'Coach Johnson' },
    player1: { username: 'player1', password: 'player123', name: 'Alex Martinez' },
    player2: { username: 'player2', password: 'player123', name: 'Sam Chen' },
    parent1: { username: 'parent1', password: 'parent123', name: 'Maria Martinez', child: 'Alex Martinez' },
    parent2: { username: 'parent2', password: 'parent123', name: 'David Chen', child: 'Sam Chen' }
};

export const players: Player[] = [
    { id: 'p1', name: 'Alex Martinez', nickname: 'Alex', position: 'Forward', number: '10', parent: 'Maria Martinez', email: 'alex@email.com', phone: '111-222-3333', photo: 'https://picsum.photos/seed/p1/200', birthMonth: "May", birthYear: "2010", notes: "Excellent dribbler, needs to work on left-foot finishing." },
    { id: 'p2', name: 'Sam Chen', nickname: 'Sam', position: 'Midfielder', number: '7', parent: 'David Chen', email: 'sam@email.com', phone: '222-333-4444', photo: 'https://picsum.photos/seed/p2/200', birthMonth: "July", birthYear: "2011", notes: "" },
    { id: 'p3', name: 'Jordan Smith', nickname: 'Jordan', position: 'Defender', number: '5', parent: 'John Smith', email: 'jordan@email.com', phone: '333-444-5555', photo: 'https://picsum.photos/seed/p3/200', birthMonth: "August", birthYear: "2010", notes: "Strong tackler, but can be overly aggressive at times." },
    { id: 'p4', name: 'Taylor Brown', nickname: 'Taylor', position: 'Goalkeeper', number: '1', parent: 'Lisa Brown', email: 'taylor@email.com', phone: '444-555-6666', photo: 'https://picsum.photos/seed/p4/200', birthMonth: "February", birthYear: "2010", notes: "" },
    { id: 'p5', name: 'Casey Davis', nickname: 'Casey', position: 'Forward', number: '11', parent: 'Mike Davis', email: 'casey@email.com', phone: '555-666-7777', photo: 'https://picsum.photos/seed/p5/200', birthMonth: "November", birthYear: "2011", notes: "" },
    { id: 'p6', name: 'Morgan Lee', nickname: 'Morgan', position: 'Midfielder', number: '8', parent: 'Sarah Lee', email: 'morgan@email.com', phone: '666-777-8888', photo: 'https://picsum.photos/seed/p6/200', birthMonth: "September", birthYear: "2010", notes: "Great field vision." }
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


export const conversations: Conversation[] = [
  {
    id: "msg001",
    recipient: ["All Players", "All Parents", "Everyone"],
    subject: "Practice Canceled Today (April 29)",
    body: "Hi Team,\n\nDue to the heavy rain and waterlogged fields, we're canceling practice today, April 29th. Please stay safe and dry.\n\nWe'll see you at Wednesday's practice.\n\nThanks,\nCoach",
    timestamp: "2025-04-29T13:30:00.000Z"
  },
  {
    id: "msg002",
    recipient: ["All Players"],
    subject: "Skills Clinic This Saturday",
    body: "Hi Players,\n\nReminder that we have a special skills clinic this Saturday from 10 AM to 12 PM at the main field. We'll be focusing on dribbling and shooting drills. Come ready to work hard!\n\nBest,\nCoach",
    timestamp: "2025-04-28T18:00:00.000Z"
  },
  {
    id: "msg003",
    recipient: ["All Parents"],
    subject: "Fundraiser Update & Volunteer Request",
    body: "Dear Parents,\n\nThank you to everyone who has participated in our car wash fundraiser! We've raised $500 so far. We still need a few more parent volunteers for this weekend's event. If you're available to help out for an hour or two, please sign up here: [link].\n\nYour support is greatly appreciated!\n\nThanks,\nCoach",
    timestamp: "2025-04-27T11:45:00.000Z"
  }
];
