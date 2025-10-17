
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/app-context';
import type { AccountType } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const { setCurrentUser, users, currentAccountType, setCurrentAccountType } = useAppContext();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        const user = Object.values(users).find(u => u.username === username && u.password === password);

        if (user) {
            setCurrentUser(user);
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    const accountTypes: AccountType[] = ['coach', 'player', 'parent'];

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">Sixx</CardTitle>
                    <CardDescription>Sports Management Hub</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="account-type">I am a</Label>
                             <Select onValueChange={(value) => setCurrentAccountType(value as AccountType)} defaultValue={currentAccountType}>
                                <SelectTrigger id="account-type">
                                    <SelectValue placeholder="Select account type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {accountTypes.map(type => (
                                        <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" required placeholder="Enter username" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input 
                                    id="password" 
                                    name="password" 
                                    type={showPassword ? 'text' : 'password'} 
                                    required 
                                    placeholder="Enter password" 
                                    className="pr-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute inset-y-0 right-0 h-full px-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                                </Button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                    <p className="text-center text-xs text-muted-foreground mt-4">
                        Demo: coach/coach123, player1/player123, parent1/parent123
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
