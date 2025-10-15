
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAppContext } from '@/context/app-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ProfilePage() {
    const { currentUser, setCurrentUser, players, setPlayers } = useAppContext();
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    
    const currentPlayerInfo = players.find(p => p.name === currentUser?.name);

    const handleEditProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const position = formData.get('position') as string;
        const number = formData.get('number') as string;

        if (currentUser) {
            const updatedPlayers = players.map(p => {
                if (p.name === currentUser.name) {
                    return { ...p, name, position, number };
                }
                return p;
            });
            setPlayers(updatedPlayers);
            setCurrentUser({ ...currentUser, name });
            setIsEditProfileOpen(false);
            alert('Profile updated successfully!');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {currentPlayerInfo ? (
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Player Information</CardTitle>
                        <CardDescription>View and edit your profile details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-center">
                            <Avatar className="w-24 h-24 text-4xl">
                                <AvatarFallback>{currentPlayerInfo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <p className="font-semibold">{currentPlayerInfo.name}</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Position</Label>
                            <p className="font-semibold">{currentPlayerInfo.position}</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Jersey Number</Label>
                            <p className="font-semibold">#{currentPlayerInfo.number}</p>
                        </div>
                        <Button onClick={() => setIsEditProfileOpen(true)} className="w-full">Edit Profile</Button>
                    </CardContent>
                </Card>
            ) : (
                <p className="text-muted-foreground text-center py-8">Could not find your player information.</p>
            )}

            <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Update your profile information. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    {currentPlayerInfo && (
                        <form onSubmit={handleEditProfile} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Name</Label>
                                <Input id="edit-name" name="name" defaultValue={currentPlayerInfo.name} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-position">Position</Label>
                                <Input id="edit-position" name="position" defaultValue={currentPlayerInfo.position} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-number">Jersey Number</Label>
                                <Input id="edit-number" name="number" defaultValue={currentPlayerInfo.number} required />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
