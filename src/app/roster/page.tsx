"use client";
import * as React from "react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PLAYER_STORAGE_KEY = "roster-players";

export default function RosterPage() {
  const [addPlayerOpen, setAddPlayerOpen] = React.useState(false);
  const [selectedPlayer, setSelectedPlayer] = React.useState<Player | null>(
    null
  );

  const [players, setPlayers] = React.useState<Player[]>(() => {
    if (typeof window === "undefined") {
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
      <PageHeader
        title="Team Roster"
        description={`Manage your ${players.length} players.`}
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
      <div className="mt-8">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Position
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Overall Skill
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Contact
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => {
                  const avatar = PlaceHolderImages.find(
                    (p) => p.id === player.avatarId
                  );
                  const avatarSrc = player.avatarUrl || avatar?.imageUrl;
                  const overallSkill = Math.round(
                    (Object.values(player.skillAssessments).reduce(
                      (a, b) => a + b,
                      0
                    ) /
                      (Object.values(player.skillAssessments).length * 10)) *
                      100
                  );
                  return (
                    <TableRow key={player.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={avatarSrc}
                              data-ai-hint={avatar?.imageHint}
                            />
                            <AvatarFallback>
                              {player.firstName.charAt(0)}
                              {player.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {player.firstName} {player.lastName}
                            </div>
                            <div className="text-muted-foreground text-sm">
                              #{player.number || "N/A"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {player.position || "N/A"}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Progress value={overallSkill} className="w-24" />
                          <span className="text-muted-foreground text-xs">
                            {overallSkill}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="text-sm">
                          <div>{player.contact.email || "N/A"}</div>
                          <div className="text-muted-foreground">
                            {player.contact.phone || "N/A"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
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
