
"use client";
import * as React from "react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { players as initialPlayers } from "./data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddPlayerForm } from "./add-player-form";
import type { Player } from "@/lib/types";
import { PlayerDetails } from "./player-details";

export default function RosterPage() {
  const [addPlayerOpen, setAddPlayerOpen] = React.useState(false);
  const [selectedPlayer, setSelectedPlayer] = React.useState<Player | null>(
    null
  );
  const [players, setPlayers] = React.useState<Player[]>(initialPlayers);

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
      <PageHeader
        title="Team Roster"
      >
        <Dialog open={addPlayerOpen} onOpenChange={setAddPlayerOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 size-4" />
              Add Player
            </Button>
          </DialogTrigger>
          <AddPlayerForm
            onPlayerAdd={handlePlayerAdd}
            setOpen={setAddPlayerOpen}
          />
        </Dialog>
      </PageHeader>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {players.map((player) => {
          const avatar = PlaceHolderImages.find(
            (p) => p.id === player.avatarId
          );
          const avatarSrc = player.avatarUrl || avatar?.imageUrl;
          
          return (
            <Card key={player.id} className="flex flex-col">
              <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
                  <Avatar className="size-12">
                    <AvatarImage
                      src={avatarSrc}
                      data-ai-hint={avatar?.imageHint}
                    />
                    <AvatarFallback>
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                   <div>
                    <CardTitle className="text-lg">
                      {player.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        #{player.number || "N/A"} | {player.position || "N/A"}
                    </p>
                  </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-end p-4 pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPlayer(player)}
                  className="w-full"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Dialog
        open={!!selectedPlayer}
        onOpenChange={(open) => !open && setSelectedPlayer(null)}
      >
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
