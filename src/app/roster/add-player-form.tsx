"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Player } from "@/lib/types";

type AddPlayerFormProps = {
  onPlayerAdd: (player: Player) => void;
  setOpen: (open: boolean) => void;
};

export function AddPlayerForm({ onPlayerAdd, setOpen }: AddPlayerFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPlayer: Player = {
      id: `p${Date.now()}`,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      number: Number(formData.get("number")),
      position: formData.get("position") as string,
      birthMonth: Number(formData.get("birthMonth")),
      birthYear: Number(formData.get("birthYear")),
      avatarId: `player${Math.floor(Math.random() * 12) + 1}`,
      contact: {
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
      },
      emergencyContact: {
        name: formData.get("emergencyName") as string,
        phone: formData.get("emergencyPhone") as string,
        relation: formData.get("emergencyRelation") as string,
      },
      medicalInfo: {
        allergies: "None",
        conditions: "None",
      },
      skillAssessments: {
        shooting: 5,
        dribbling: 5,
        passing: 5,
        defense: 5,
      },
    };
    onPlayerAdd(newPlayer);
    setOpen(false);
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add New Player</DialogTitle>
        <DialogDescription>
          Fill in the details below to add a new player to your roster.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <ScrollArea className="h-96">
            <div className="space-y-4 py-4 px-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" name="position" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="number">Jersey Number</Label>
                    <Input id="number" name="number" type="number" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="birthMonth">Birth Month</Label>
                <Input id="birthMonth" name="birthMonth" type="number" placeholder="MM" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="birthYear">Birth Year</Label>
                <Input id="birthYear" name="birthYear" type="number" placeholder="YYYY" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" />
            </div>
            
            <h4 className="text-sm font-medium pt-4 border-t">Emergency Contact</h4>
            
            <div className="space-y-2">
                <Label htmlFor="emergencyName">Full Name</Label>
                <Input id="emergencyName" name="emergencyName" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Phone</Label>
                <Input id="emergencyPhone" name="emergencyPhone" type="tel" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="emergencyRelation">Relation</Label>
                <Input id="emergencyRelation" name="emergencyRelation" />
                </div>
            </div>
            </div>
        </ScrollArea>
        <DialogFooter className="pt-4 border-t">
          <Button type="submit">Add Player</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
