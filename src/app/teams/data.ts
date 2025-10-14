
export type Team = {
    id: string;
    name: string;
    sport: string;
    coachId: string;
};

export const teams: Team[] = [
    {
        id: 'team-1',
        name: 'Warriors',
        sport: 'Basketball',
        coachId: 'coach-1',
    },
    {
        id: 'team-2',
        name: 'Tigers',
        sport: 'Basketball',
        coachId: 'coach-1',
    },
    {
        id: 'team-3',
        name: 'Eagles',
        sport: 'Soccer',
        coachId: 'coach-1',
    }
]
