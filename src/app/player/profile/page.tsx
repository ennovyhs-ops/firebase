
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAppContext } from '@/context/app-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Edit, Trash2, User, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
    const { currentUser, setCurrentUser, players, setPlayers, users } = useAppContext();
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    
    const currentPlayerInfo = players.find(p => p.name === currentUser?.name);

    const handleEditProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const nickname = formData.get('nickname') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;

        if (currentUser && currentPlayerInfo) {
            const updatedPlayer = { ...currentPlayerInfo, name, nickname, email, phone };
            
            const updatedPlayers = players.map(p => 
                p.id === currentPlayerInfo.id ? updatedPlayer : p
            );
            setPlayers(updatedPlayers);
            setCurrentUser({ ...currentUser, name });
            setIsEditProfileOpen(false);
            alert('Profile updated successfully!');
        }
    };
    
    const handleLogout = () => {
        setCurrentUser(null);
    };

    const parentUser = Object.values(users).find(u => u.name === currentPlayerInfo?.parent);

    return (
        <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            </div>
            {currentPlayerInfo ? (
                 <div className="grid gap-8 md:grid-cols-2">
                    <Card>
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
                                <Label>Nickname</Label>
                                <p className="font-semibold">{currentPlayerInfo.nickname || 'N/A'}</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Birthdate</Label>
                                <p className="font-semibold">{currentPlayerInfo.birthMonth} {currentPlayerInfo.birthYear}</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Contact Email</Label>
                                <p className="font-semibold">{currentPlayerInfo.email}</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Contact Phone</Label>
                                <p className="font-semibold">{currentPlayerInfo.phone}</p>
                            </div>
                            <Button onClick={() => setIsEditProfileOpen(true)} className="w-full">
                                <Edit className="mr-2" />
                                Edit Profile
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                            <CardDescription>Manage your account and team settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="font-medium mb-2">Linked Parent Account</h4>
                                {parentUser ? (
                                    <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                                        <User className="size-5 text-muted-foreground" />
                                        <span className="text-sm font-medium">{parentUser.name}</span>
                                    </div>
                                ): (
                                    <p className="text-sm text-muted-foreground">No parent account linked.</p>
                                )}
                            </div>
                            <Separator />
                             <div>
                                <h4 className="font-medium mb-2">Team Membership</h4>
                                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                                    <div className="flex items-center gap-3">
                                        <Users className="size-5 text-muted-foreground" />
                                        <span className="text-sm font-medium">U-12 Falcons</span>
                                    </div>
                                    <Button variant="outline" size="sm">Leave Team</Button>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium">Logout</h4>
                                    <p className="text-sm text-muted-foreground">End your current session.</p>
                                </div>
                                <Button variant="secondary" onClick={handleLogout}>
                                    <LogOut className="mr-2" />
                                    Logout
                                </Button>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium text-destructive">Delete Account</h4>
                                    <p className="text-sm text-muted-foreground">Permanently delete your account.</p>
                                </div>
                                <Button variant="destructive">
                                    <Trash2 className="mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
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
                                <Input id="edit-email" name="email" type="email" defaultValue={currentPlayerInfo.email} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-phone">Phone</Label>
                                <Input id="edit-phone" name="phone" type="tel" defaultValue={currentPlayerInfo.phone} required />
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
