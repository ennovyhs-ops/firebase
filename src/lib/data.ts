
import type { User, Player, Message, ScheduleEvent } from './types';

export const users: Record<string, User> = {
    coach: { username: 'coach', password: 'coach123', name: 'Coach Johnson' },
    player1: { username: 'player1', password: 'player123', name: 'Alex Martinez' },
    player2: { username: 'player2', password: 'player123', name: 'Sam Chen' },
    parent1: { username: 'parent1', password: 'parent123', name: 'Maria Martinez', child: 'Alex Martinez' },
    parent2: { username: 'parent2', password: 'parent123', name: 'David Chen', child: 'Sam Chen' }
};

export const players: Player[] = [
    { name: 'Alex Martinez', position: 'Forward', number: '10', parent: 'Maria Martinez', email: 'maria@email.com' },
    { name: 'Sam Chen', position: 'Midfielder', number: '7', parent: 'David Chen', email: 'david@email.com' },
    { name: 'Jordan Smith', position: 'Defender', number: '5', parent: 'John Smith', email: 'john@email.com' },
    { name: 'Taylor Brown', position: 'Goalkeeper', number: '1', parent: 'Lisa Brown', email: 'lisa@email.com' },
    { name: 'Casey Davis', position: 'Forward', number: '11', parent: 'Mike Davis', email: 'mike@email.com' },
    { name: 'Morgan Lee', position: 'Midfielder', number: '8', parent: 'Sarah Lee', email: 'sarah@email.com' }
];

export const messages: Message[] = [
    { from: 'Coach Johnson', to: 'all', subject: 'Practice Tomorrow', body: 'Reminder: We have practice tomorrow at 4 PM. Please arrive 15 minutes early.', time: '2 hours ago' },
    { from: 'Coach Johnson', to: 'all', subject: 'Game This Weekend', body: 'Our game against Eagles is Saturday at 10 AM. Meet at the field by 9:30 AM.', time: '1 day ago' },
    { from: 'Coach Johnson', to: 'parents', subject: 'Parent Meeting', body: 'We will have a parent meeting next Tuesday at 6 PM to discuss the upcoming tournament.', time: '2 days ago' }
];

export const schedule: ScheduleEvent[] = [
    { id: '1', type: 'Practice', date: '2025-10-15', time: '16:00', location: 'Main Field', details: 'Regular team practice' },
    { id: '2', type: 'Game', date: '2025-10-18', time: '10:00', location: 'Eagles Stadium', details: 'Match vs Eagles' },
    { id: '3', type: 'Practice', date: '2025-10-20', time: '16:00', location: 'Main Field', details: 'Regular team practice' },
    { id: '4', type: 'Meeting', date: '2025-10-21', time: '18:00', location: 'Clubhouse', details: 'Parent meeting - Tournament discussion' }
];
