"use client";
import * as React from "react";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { players as initialPlayers } from "./data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddPlayerForm } from "./add-player-form";
import type { Player } from "@/lib/types";
import { PlayerDetails } from "./player-details";

const PLAYER_STORAGE_KEY = "roster-players";

export default function RosterPage() {
  const [addPlayerOpen, setAddPlayerOpen] = React.useState(false);
  const [selectedPlayer, setSelectedPlayer] = React.useState<Player | null>(null);
  
  const [players, setPlayers] = React.useState<Player[]>(() => {
    if (typeof window === 'undefined') {
      return initialPlayers;
    }
    const storedPlayers = localStorage.getItem(PLAYER_STORAGE_KEY);
    return storedPlayers ? JSON.parse(storedPlayers) : initialPlayers;
  });

  React.useEffect(() => {
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(players));
  }, [players]);


  const handlePlayerAdd = (player: Player) => {
    setPlayers((prev) => [...prev, player]);
  };

  const handlePlayerUpdate = (updatedPlayer: Player) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
    );
    setSelectedPlayer(updatedPlayer);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Team Roster" description={`Manage your ${players.length} players.`}>
        <Dialog open={addPlayerOpen} onOpenChange={setAddPlayerOpen}>
          <DialogTrigger asChild>
            <Button>
                <PlusCircle className="mr-2 size-4"/>
                Add Player
            </Button>
          </DialogTrigger>
          <AddPlayerForm onPlayerAdd={handlePlayerAdd} setOpen={setAddPlayerOpen} />
        </Dialog>
      </PageHeader>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {players.map((player) => {
          const avatar = PlaceHolderImages.find((p) => p.id === player.avatarId);
          const avatarSrc = player.avatarUrl || avatar?.imageUrl;
          const overallSkill = Math.round(
            (Object.values(player.skillAssessments).reduce((a, b) => a + b, 0) /
              (Object.values(player.skillAssessments).length * 10)) * 100
          );
          return (
            <Card key={player.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="size-16">
                  <AvatarImage src={avatarSrc} data-ai-hint={avatar?.imageHint}/>
                  <AvatarFallback>{player.firstName.charAt(0)}{player.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>#{player.number || 'N/A'} {player.firstName} {player.lastName}</CardTitle>
                  <CardDescription>{player.position || 'N/A'}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                        <span>Overall Skill</span>
                        <span className="text-primary">{overallSkill}%</span>
                    </div>
                    <Progress value={overallSkill} />
                </div>
                <div className="text-sm space-y-2">
                    <p className="font-medium">Contact Info</p>
                    <p className="text-muted-foreground">{player.contact.email || 'N/A'}</p>
                    <p className="text-muted-foreground">{player.contact.phone || 'N/A'}</p>
                </div>
              </CardContent>
              <CardFooter>
                 <Button variant="secondary" className="w-full" onClick={() => setSelectedPlayer(player)}>View Details</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
       <Dialog open={!!selectedPlayer} onOpenChange={(open) => !open && setSelectedPlayer(null)}>
        {selectedPlayer && (
            <PlayerDetails 
                player={selectedPlayer} 
                onPlayerUpdate={handlePlayerUpdate}
                setOpen={(open) => !open && setSelectedPlayer(null)}
            />
        )}
      </Dialog>
    </div>
  );
}
