
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Player } from '@/lib/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import CoachLayout from '../coach/layout';


export default function RosterPage() {
    const { players, setPlayers } = useAppContext();
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [isAddPlayerOpen, setAddPlayerOpen] = useState(false);
    const [isEditPlayerOpen, setEditPlayerOpen] = useState(false);

    const handleAddPlayer = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newPlayer: Player = {
            id: `p${players.length + 1}`,
            name: formData.get('name') as string,
            position: formData.get('position') as string,
            number: formData.get('number') as string,
            parent: formData.get('parent') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
        };
        setPlayers([...players, newPlayer]);
        setAddPlayerOpen(false);
    };

    const handleEditPlayer = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedPlayer) return;

        const formData = new FormData(e.currentTarget);
        const updatedPlayer: Player = {
            ...selectedPlayer,
            name: formData.get('name') as string,
            position: formData.get('position') as string,
            number: formData.get('number') as string,
            parent: formData.get('parent') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
        };

        setPlayers(players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
        setEditPlayerOpen(false);
        setSelectedPlayer(updatedPlayer);
    };
    
    const handleDeletePlayer = (playerId: string) => {
        setPlayers(players.filter(p => p.id !== playerId));
        setSelectedPlayer(null);
    };

    return (
        <CoachLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Team Roster</h1>
                    <Dialog open={isAddPlayerOpen} onOpenChange={setAddPlayerOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2" />
                                Add Player
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Player</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddPlayer} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Player Name</Label>
                                    <Input id="name" name="name" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="position">Position</Label>
                                    <Input id="position" name="position" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="number">Jersey Number</Label>
                                    <Input id="number" name="number" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="parent">Parent/Guardian Name</Label>
                                    <Input id="parent" name="parent" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Contact Email</Label>
                                    <Input id="email" name="email" type="email" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Contact Phone</Label>
                                    <Input id="phone" name="phone" type="tel" required />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">Add Player</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Player</TableHead>
                                    <TableHead className="hidden sm:table-cell">Position</TableHead>
                                    <TableHead className="hidden md:table-cell">Contact</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {players.map((player) => (
                                    <TableRow key={player.id} onClick={() => setSelectedPlayer(player)} className="cursor-pointer">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                {player.photo && <Image src={player.photo} alt={player.name} width={40} height={40} className="rounded-full" />}
                                                <div>
                                                    <div className="font-medium">{player.name}</div>
                                                    <div className="text-sm text-muted-foreground">#{player.number}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">{player.position}</TableCell>
                                        <TableCell className="hidden md:table-cell">{player.email}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                                        <MoreHorizontal />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onSelect={() => setSelectedPlayer(player)}>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => { setSelectedPlayer(player); setEditPlayerOpen(true); }}>Edit Player</DropdownMenuItem>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete Player</DropdownMenuItem>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>This will permanently delete {player.name} from the roster. This action cannot be undone.</AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeletePlayer(player.id)}>Delete</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Dialog open={!!selectedPlayer && !isEditPlayerOpen} onOpenChange={(isOpen) => !isOpen && setSelectedPlayer(null)}>
                    {selectedPlayer && (
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <div className="flex items-center gap-4">
                                    {selectedPlayer.photo && <Image src={selectedPlayer.photo} alt={selectedPlayer.name} width={60} height={60} className="rounded-full" />}
                                    <div>
                                        <DialogTitle className="text-2xl">{selectedPlayer.name}</DialogTitle>
                                        <DialogDescription>#{selectedPlayer.number} • {selectedPlayer.position}</DialogDescription>
                                    </div>
                                </div>
                            </DialogHeader>
                            <div className="py-4 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Player Contact</h3>
                                    <div className="flex items-center gap-3">
                                        <Label className="w-20">Email</Label>
                                        <span className="text-sm">{selectedPlayer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Label className="w-20">Phone</Label>
                                        <span className="text-sm">{selectedPlayer.phone}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Parent/Guardian Contact</h3>
                                    <div className="flex items-center gap-3">
                                        <Label className="w-20">Name</Label>
                                        <span className="text-sm">{selectedPlayer.parent}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Label className="w-20">Email</Label>
                                        <span className="text-sm">{selectedPlayer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Label className="w-20">Phone</Label>
                                        <span className="text-sm">{selectedPlayer.phone}</span>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-between gap-2">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">Delete Player</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>This will permanently delete {selectedPlayer.name} from the roster. This action cannot be undone.</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeletePlayer(selectedPlayer.id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => { setEditPlayerOpen(true); }}>Edit</Button>
                                    <DialogClose asChild>
                                        <Button>Close</Button>
                                    </DialogClose>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    )}
                </Dialog>

                <Dialog open={isEditPlayerOpen} onOpenChange={(isOpen) => { if (!isOpen) setSelectedPlayer(null); setEditPlayerOpen(isOpen); }}>
                    {selectedPlayer && (
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit {selectedPlayer.name}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleEditPlayer} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-name">Player Name</Label>
                                    <Input id="edit-name" name="name" defaultValue={selectedPlayer.name} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-position">Position</Label>
                                    <Input id="edit-position" name="position" defaultValue={selectedPlayer.position} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-number">Jersey Number</Label>
                                    <Input id="edit-number" name="number" defaultValue={selectedPlayer.number} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-parent">Parent/Guardian Name</Label>
                                    <Input id="edit-parent" name="parent" defaultValue={selectedPlayer.parent} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-email">Contact Email</Label>
                                    <Input id="edit-email" name="email" type="email" defaultValue={selectedPlayer.email} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-phone">Contact Phone</Label>
                                    <Input id="edit-phone" name="phone" type="tel" defaultValue={selectedPlayer.phone} required />
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="secondary" onClick={() => setEditPlayerOpen(false)}>Cancel</Button>
                                    <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    )}
                </Dialog>
            </div>
        </CoachLayout>
    );
}

    