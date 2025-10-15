
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAppContext } from '@/context/app-context';

function PlayerCard({ name, position, number }: { name: string, position: string, number: string }) {
    return (
        <Card className="text-center">
            <CardContent className="p-4">
                <Avatar className="mx-auto mb-4 w-20 h-20">
                    <AvatarFallback className="text-3xl font-bold">{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-bold text-lg">{name}</p>
                <p className="text-sm text-muted-foreground">#{number} | {position}</p>
            </CardContent>
        </Card>
    );
}

export default function TeamPage() {
    const { players } = useAppContext();
    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Team Roster</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {players.map((p, i) => <PlayerCard key={i} name={p.name} position={p.position} number={p.number} />)}
                </CardContent>
            </Card>
        </div>
    );
}
