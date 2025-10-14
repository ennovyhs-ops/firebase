
"use client";
import * as React from "react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { players as initialPlayers } from "./data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function RosterPage() {
  const { toast } = useToast();
  const [addPlayerOpen, setAddPlayerOpen] = React.useState(false);
  const [selectedPlayer, setSelectedPlayer] = React.useState<Player | null>(
    null
  );
  const [playerToDelete, setPlayerToDelete] = React.useState<Player | null>(null);
  const [players, setPlayers] = React.useState<Player[]>(initialPlayers);

  const handlePlayerAdd = (player: Player) => {
    setPlayers((prev) => [...prev, player]);
    toast({
      title: "Player Added",
      description: `${player.firstName} ${player.lastName} has been added to the roster.`,
    });
  };

  const handlePlayerUpdate = (updatedPlayer: Player) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
    );
    setSelectedPlayer(updatedPlayer);
     toast({
      title: "Player Updated",
      description: `Information for ${updatedPlayer.firstName} ${updatedPlayer.lastName} has been saved.`,
    });
  };

  const handlePlayerDelete = (player: Player) => {
    setPlayers((prev) => prev.filter((p) => p.id !== player.id));
    toast({
      title: "Player Deleted",
      description: `${player.firstName} ${player.lastName} has been removed from the roster.`,
    });
    setPlayerToDelete(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Team Roster"
      >
        <Dialog open={addPlayerOpen} onOpenChange={setAddPlayerOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle />
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
                  <TableHead className="hidden md:table-cell">Contact</TableHead>
                  <TableHead className="w-[180px]"></TableHead>
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
                      <TableCell className="hidden md:table-cell">
                        <div>{player.contact.email}</div>
                        <div className="text-muted-foreground">{player.contact.phone}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                            <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPlayer(player)}
                            >
                            View Details
                            </Button>
                        </div>
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
            onPlayerDelete={(player) => {
                setSelectedPlayer(null);
                // Delay setting player to delete to avoid dialog animation conflicts
                setTimeout(() => setPlayerToDelete(player), 150);
            }}
            setOpen={(open) => !open && setSelectedPlayer(null)}
          />
        )}
      </Dialog>
      <AlertDialog open={!!playerToDelete} onOpenChange={(open) => !open && setPlayerToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this player?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove <span className="font-semibold">{playerToDelete?.firstName} {playerToDelete?.lastName}</span> from your roster.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => playerToDelete && handlePlayerDelete(playerToDelete)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
