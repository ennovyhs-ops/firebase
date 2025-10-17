
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppContext } from '@/context/app-context';

function PlayerCard({ name, position, number, photo }: { name: string, position: string, number: string, photo?: string }) {
    return (
        <Card className="text-center">
            <CardContent className="p-4">
                <Avatar className="mx-auto mb-4 w-20 h-20">
                   {photo && <AvatarImage src={photo} alt={name} />}
                    <AvatarFallback className="text-3xl font-bold">{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-bold text-lg">{name}</p>
                <p className="text-sm text-muted-foreground">#{number} | {position}</p>
            </CardContent>
        </Card>
    );
}

export default function TeamPage() {
    const { players, users, selectedTeam } = useAppContext();
    const coach = users['coach'];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">{selectedTeam?.name || "Team Roster"}</h1>
                <p className="text-muted-foreground">Coached by {coach.name}</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Players</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {players.map((p) => <PlayerCard key={p.id} name={p.name} position={p.position} number={p.number} photo={p.photo} />)}
                </CardContent>
            </Card>
        </div>
    );
}
