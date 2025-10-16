
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/app-context';
import type { AccountType } from '@/lib/types';

export default function LoginPage() {
    const { setCurrentUser, users, currentAccountType, setCurrentAccountType } = useAppContext();

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
                    <CardTitle className="text-3xl font-bold">TeamConnect</CardTitle>
                    <CardDescription>Sports Team Management Platform</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        {accountTypes.map(type => (
                            <Button 
                                key={type} 
                                variant={currentAccountType === type ? "default" : "outline"}
                                className="capitalize"
                                onClick={() => setCurrentAccountType(type)}
                            >
                                {type}
                            </Button>
                        ))}
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" required placeholder="Enter username" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required placeholder="Enter password" />
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
