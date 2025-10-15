
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAppContext } from '@/context/app-context';

export default function ChildPage() {
    const { currentUser, players } = useAppContext();
    const child = players.find(p => p.parent === currentUser?.name);

    return (
        <div className="container mx-auto px-4 py-8">
            {child ? (
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Player Information</CardTitle>
                        <CardDescription>Details for {child.name}.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Avatar className="w-24 h-24 mx-auto mb-4 text-4xl">
                            <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="font-bold text-2xl">{child.name}</p>
                        <p className="text-md text-muted-foreground">Position: {child.position}</p>
                        <p className="text-md text-muted-foreground">Number: #{child.number}</p>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent className="p-10 text-center">
                        <p className="text-muted-foreground">Could not find child information.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
