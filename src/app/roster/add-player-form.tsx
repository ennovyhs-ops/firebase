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
      name: formData.get("name") as string,
      number: Number(formData.get("number")),
      position: formData.get("position") as string,
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
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Player</DialogTitle>
        <DialogDescription>
          Fill in the details below to add a new player to your roster.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" required className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Number
            </Label>
            <Input id="number" name="number" type="number" required className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="position" className="text-right">
              Position
            </Label>
            <Input id="position" name="position" required className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" name="email" type="email" required className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input id="phone" name="phone" type="tel" required className="col-span-3" />
          </div>
          <h4 className="text-sm font-medium mt-4 border-t pt-4 col-span-4">Emergency Contact</h4>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emergencyName" className="text-right">
              Name
            </Label>
            <Input id="emergencyName" name="emergencyName" required className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emergencyPhone" className="text-right">
              Phone
            </Label>
            <Input id="emergencyPhone" name="emergencyPhone" type="tel" required className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emergencyRelation" className="text-right">
              Relation
            </Label>
            <Input id="emergencyRelation" name="emergencyRelation" required className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Player</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
