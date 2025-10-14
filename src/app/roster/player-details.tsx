
"use client";

import * as React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Player } from "@/lib/types";
import { Upload } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

type PlayerDetailsProps = {
  player: Player;
  onPlayerUpdate: (player: Player) => void;
  setOpen: (open: boolean) => void;
};

export function PlayerDetails({
  player,
  onPlayerUpdate,
  setOpen,
}: PlayerDetailsProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    player.avatarUrl || null
  );
  const avatarPlaceholder = PlaceHolderImages.find(
    (p) => p.id === player.avatarId
  );
  const avatarSrc = player.avatarUrl || avatarPlaceholder?.imageUrl;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedPlayer: Player = {
      ...player,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      number: Number(formData.get("number")),
      position: formData.get("position") as string,
      avatarUrl: previewUrl || player.avatarUrl,
      contact: {
        ...player.contact,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
      },
      emergencyContact: {
        ...player.emergencyContact,
        name: formData.get("emergencyName") as string,
        phone: formData.get("emergencyPhone") as string,
        relation: formData.get("emergencyRelation") as string,
      }
    };
    onPlayerUpdate(updatedPlayer);
    setOpen(false);
  };

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <div className="flex items-center gap-4">
          <Avatar className="size-20">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>
              {player.firstName?.charAt(0)}
              {player.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-3xl">
              {player.firstName} {player.lastName}
            </DialogTitle>
            <DialogDescription>
              #{player.number} | {player.position}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <ScrollArea className="h-[50vh]">
          <div className="space-y-6 p-6">
            <div className="space-y-2">
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-4">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Player photo preview"
                    width={80}
                    height={80}
                    className="rounded-md object-cover size-20"
                  />
                ) : (
                  <div className="size-20 rounded-md bg-muted flex items-center justify-center">
                    <Upload className="size-8 text-muted-foreground" />
                  </div>
                )}
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="max-w-xs"
                />
              </div>
            </div>
            
            <h3 className="text-lg font-medium border-b pb-2">Player Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  defaultValue={player.firstName}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  defaultValue={player.lastName}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  defaultValue={player.position}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Jersey Number</Label>
                <Input
                  id="number"
                  name="number"
                  type="number"
                  defaultValue={player.number}
                />
              </div>
            </div>

            <h3 className="text-lg font-medium border-b pb-2 pt-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={player.contact.email}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={player.contact.phone}
                    />
                </div>
            </div>
            
            <h3 className="text-lg font-medium border-b pb-2 pt-4">Emergency Contact</h3>
            
            <div className="space-y-2">
                <Label htmlFor="emergencyName">Full Name</Label>
                <Input
                id="emergencyName"
                name="emergencyName"
                defaultValue={player.emergencyContact.name}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Phone</Label>
                <Input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="tel"
                    defaultValue={player.emergencyContact.phone}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="emergencyRelation">Relation</Label>
                <Input
                    id="emergencyRelation"
                    name="emergencyRelation"
                    defaultValue={player.emergencyContact.relation}
                />
                </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="pt-4 border-t gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
