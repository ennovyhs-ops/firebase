
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAppContext } from '@/context/app-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PlayerLayout from '../layout';
import { LogOut } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
    const { currentUser, setCurrentUser, players, setPlayers } = useAppContext();
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    
    const currentPlayerInfo = players.find(p => p.name === currentUser?.name);

    const handleEditProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const nickname = formData.get('nickname') as string;

        if (currentUser) {
            const updatedPlayers = players.map(p => {
                if (p.name === currentUser.name) {
                    return { ...p, name, nickname };
                }
                return p;
            });
            setPlayers(updatedPlayers);
            setCurrentUser({ ...currentUser, name });
            setIsEditProfileOpen(false);
            alert('Profile updated successfully!');
        }
    };
    
    const handleLogout = () => {
        setCurrentUser(null);
    };


    return (
        <PlayerLayout>
            <div className="container mx-auto px-4 py-8">
                 <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                    <Button variant="destructive" onClick={handleLogout} size="sm">
                        <LogOut className="mr-2" />
                        Logout
                    </Button>
                </div>
                {currentPlayerInfo ? (
                    <Card className="max-w-md mx-auto">
                        <CardHeader className="items-center text-center">
                             {currentPlayerInfo.photo && (
                                <Avatar className="w-24 h-24 text-4xl">
                                    <AvatarImage src={currentPlayerInfo.photo} alt={currentPlayerInfo.name} />
                                    <AvatarFallback>{currentPlayerInfo.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                             )}
                            <CardTitle className="text-2xl">{currentPlayerInfo.name}</CardTitle>
                            <CardDescription>#{currentPlayerInfo.number} | {currentPlayerInfo.position}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Separator />
                            <div className="space-y-2">
                                <Label>Parent/Guardian</Label>
                                <p className="font-semibold">{currentPlayerInfo.parent}</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Contact Email</Label>
                                <p className="font-semibold">{currentPlayerInfo.email}</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Contact Phone</Label>
                                <p className="font-semibold">{currentPlayerInfo.phone}</p>
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
                                Update your name and contact information.
                            </DialogDescription>
                        </DialogHeader>
                        {currentPlayerInfo && (
                            <form onSubmit={handleEditProfile} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-name">Name</Label>
                                    <Input id="edit-name" name="name" defaultValue={currentPlayerInfo.name} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-nickname">Nickname</Label>
                                    <Input id="edit-nickname" name="nickname" defaultValue={currentPlayerInfo.nickname} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="edit-email">Email</Label>
                                    <Input id="edit-email" name="email" defaultValue={currentPlayerInfo.email} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-phone">Phone</Label>
                                    <Input id="edit-phone" name="phone" defaultValue={currentPlayerInfo.phone} required />
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
        </PlayerLayout>
    );
}
