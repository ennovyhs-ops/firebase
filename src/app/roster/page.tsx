
"use client";
import * as React from "react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { players as initialPlayers } from "./data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddPlayerForm } from "./add-player-form";
import type { Player } from "@/lib/types";
import { PlayerDetails } from "./player-details";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
              <PlusCircle className="mr-2 sm:hidden" />
              <span className="hidden sm:inline">Add Player</span>
            </Button>
          </DialogTrigger>
          <AddPlayerForm
            onPlayerAdd={handlePlayerAdd}
            setOpen={setAddPlayerOpen}
          />
        </Dialog>
      </PageHeader>
      <div className="mt-8">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead className="hidden lg:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="w-[120px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => {
                  const avatar = PlaceHolderImages.find(
                    (p) => p.id === player.avatarId
                  );
                  const avatarSrc = player.avatarUrl || avatar?.imageUrl;
                  const playerName = `${player.firstName} ${player.lastName}`;
                  return (
                    <TableRow key={player.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10">
                            <AvatarImage
                              src={avatarSrc}
                              data-ai-hint={avatar?.imageHint}
                            />
                            <AvatarFallback>
                              {player.firstName.charAt(0)}{player.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                           <div>
                            <span className="font-medium">{playerName}</span>
                            <div className="text-sm text-muted-foreground">
                                #{player.number || 'N/A'} | {player.position || 'N/A'}
                            </div>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{player.contact.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{player.contact.phone}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedPlayer(player)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
