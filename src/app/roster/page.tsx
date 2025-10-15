
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
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Player } from '@/lib/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import CoachLayout from '../coach/layout';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

export default function RosterPage() {
    const { players, setPlayers } = useAppContext();
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [dialogState, setDialogState] = useState<'add' | 'edit' | 'view' | 'delete' | null>(null);

    const openDialog = (state: 'add' | 'edit' | 'view' | 'delete', player?: Player) => {
        setSelectedPlayer(player || null);
        setDialogState(state);
    }
    
    const closeDialog = () => {
        setDialogState(null);
        setSelectedPlayer(null);
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const playerDetails = {
            name: formData.get('name') as string,
            position: formData.get('position') as string,
            number: formData.get('number') as string,
            parent: formData.get('parent') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            birthMonth: formData.get('birthMonth') as string,
            birthYear: formData.get('birthYear') as string,
            notes: formData.get('notes') as string,
        };

        if (dialogState === 'add') {
            const newPlayer: Player = {
                id: `p${players.length + 1}`,
                ...playerDetails,
                photo: `https://picsum.photos/seed/p${players.length + 1}/200`
            };
            setPlayers([...players, newPlayer]);
        } else if (dialogState === 'edit' && selectedPlayer) {
            const updatedPlayer: Player = {
                ...selectedPlayer,
                ...playerDetails
            };
            setPlayers(players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
        }
        closeDialog();
    };
    
    const handleDeletePlayer = () => {
        if (selectedPlayer) {
            setPlayers(players.filter(p => p.id !== selectedPlayer.id));
        }
        closeDialog();
    };

    return (
        <CoachLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Team Roster</h1>
                    <Button onClick={() => openDialog('add')}>
                        <PlusCircle className="mr-2" />
                        Add Player
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Player</TableHead>
                                    <TableHead className="hidden sm:table-cell">Position</TableHead>
                                    <TableHead className="hidden md:table-cell">Contact</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {players.map((player) => (
                                    <TableRow key={player.id} onClick={() => openDialog('view', player)} className="cursor-pointer">
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
                                                    <DropdownMenuItem onSelect={() => openDialog('view', player)}>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => openDialog('edit', player)}>Edit Player</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => openDialog('delete', player)} className="text-destructive">Delete Player</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Add/Edit Dialog */}
                <Dialog open={dialogState === 'add' || dialogState === 'edit'} onOpenChange={closeDialog}>
                    <DialogContent className="sm:max-w-[480px]">
                        <DialogHeader>
                            <DialogTitle>{dialogState === 'add' ? 'Add New Player' : `Edit ${selectedPlayer?.name}`}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-6">
                             <div className="space-y-2">
                                <Label htmlFor="name">Player Name</Label>
                                <Input id="name" name="name" defaultValue={selectedPlayer?.name} required />
                            </div>
                             <div className="flex gap-4">
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="number">Jersey Number</Label>
                                    <Input id="number" name="number" defaultValue={selectedPlayer?.number} required />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="position">Position</Label>
                                    <Input id="position" name="position" defaultValue={selectedPlayer?.position} required />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="birthMonth">Birth Month</Label>
                                    <Input id="birthMonth" name="birthMonth" defaultValue={selectedPlayer?.birthMonth} placeholder="e.g., January" />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="birthYear">Birth Year</Label>
                                    <Input id="birthYear" name="birthYear" defaultValue={selectedPlayer?.birthYear} placeholder="e.g., 2010" />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="parent">Parent/Guardian Name</Label>
                                <Input id="parent" name="parent" defaultValue={selectedPlayer?.parent} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Contact Email</Label>
                                <Input id="email" name="email" type="email" defaultValue={selectedPlayer?.email} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Contact Phone</Label>
                                <Input id="phone" name="phone" type="tel" defaultValue={selectedPlayer?.phone} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Coach's Notes (Private)</Label>
                                <Textarea id="notes" name="notes" defaultValue={selectedPlayer?.notes} />
                            </div>
                            <DialogFooter className="pt-4 sticky bottom-0 bg-background">
                                <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                                <Button type="submit">{dialogState === 'add' ? 'Add Player' : 'Save Changes'}</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* View Details Dialog */}
                <Dialog open={dialogState === 'view'} onOpenChange={closeDialog}>
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
                                <div className="space-y-2">
                                    <p className="text-sm"><Label className="w-24 inline-block font-semibold">Birthdate:</Label> {selectedPlayer.birthMonth} {selectedPlayer.birthYear}</p>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Player Contact</h3>
                                    <p className="text-sm"><Label className="w-24 inline-block">Email:</Label> {selectedPlayer.email}</p>
                                    <p className="text-sm"><Label className="w-24 inline-block">Phone:</Label> {selectedPlayer.phone}</p>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Parent/Guardian</h3>
                                    <p className="text-sm"><Label className="w-24 inline-block">Name:</Label> {selectedPlayer.parent}</p>
                                </div>
                                {selectedPlayer.notes && (
                                    <>
                                        <Separator />
                                        <div className="space-y-2">
                                            <h3 className="font-semibold text-lg">Coach's Notes</h3>
                                            <p className="text-sm whitespace-pre-wrap">{selectedPlayer.notes}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                            <DialogFooter className="sm:justify-between gap-2">
                                <Button variant="destructive" onClick={() => openDialog('delete', selectedPlayer)}>Delete Player</Button>
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => openDialog('edit', selectedPlayer)}>Edit</Button>
                                    <DialogClose asChild><Button>Close</Button></DialogClose>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    )}
                </Dialog>
                
                {/* Delete Confirmation */}
                <AlertDialog open={dialogState === 'delete'} onOpenChange={closeDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>This will permanently delete {selectedPlayer?.name} from the roster. This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeletePlayer} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </CoachLayout>
    );
}
