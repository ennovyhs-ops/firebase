

export type AccountType = 'coach' | 'player' | 'parent';

export type User = {
    username: string;
    password?: string;
    name: string;
    child?: string;
}

export type Player = {
    id: string;
    name: string;
    position: string;
    number: string;
    parent: string;
    email: string;
    phone: string;
    photo?: string;
};

export type Message = {
    from: string;
    to: 'all' | 'players' | 'parents' | string;
    subject: string;
    body: string;
    time: string;
};

export type ScheduleEvent = {
    id: string;
    type: 'Practice' | 'Game' | 'Meeting' | 'Other';
    date: string;
    time: string;
    location: string;
    details: string;
};

export type Team = {
    id: string;
    name: string;
    sport: string;
    logo?: string;
}

    
