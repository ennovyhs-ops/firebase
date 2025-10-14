
"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Upload } from "lucide-react";
import { useAuth, useUser } from "@/firebase";
import { updateProfile } from "firebase/auth";

const LOGO_STORAGE_KEY = "team-logo";
const TEAM_NAME_STORAGE_KEY = "team-name";

export default function SettingsPage() {
  const { toast } = useToast();
  const auth = useAuth();
  const { user } = useUser();

  // Team settings state
  const [teamLogoPreviewUrl, setTeamLogoPreviewUrl] = useState<string | null>(null);
  const [teamNameInput, setTeamNameInput] = useState<string>("");

  // User profile settings state
  const [displayName, setDisplayName] = useState("");
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // Load team settings from local storage
    const storedLogo = localStorage.getItem(LOGO_STORAGE_KEY);
    if (storedLogo) {
      setTeamLogoPreviewUrl(storedLogo);
    }
    const storedTeamName = localStorage.getItem(TEAM_NAME_STORAGE_KEY);
    setTeamNameInput(storedTeamName || "Sixx");

    // Load user profile settings from Firebase user
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoPreviewUrl(user.photoURL || null);
    }
  }, [user]);

  const handleTeamLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamLogoPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePhotoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTeamBrandingSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (teamNameInput) {
      localStorage.setItem(TEAM_NAME_STORAGE_KEY, teamNameInput);
      window.dispatchEvent(new CustomEvent('teamNameUpdated'));
    }

    if (teamLogoPreviewUrl) {
      localStorage.setItem(LOGO_STORAGE_KEY, teamLogoPreviewUrl);
      window.dispatchEvent(new CustomEvent('logoUpdated'));
    }

    toast({
      title: "Settings Saved!",
      description: "Your team branding has been updated.",
    });
  };

  const handleProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth.currentUser) {
        toast({
            variant: "destructive",
            title: "Not signed in",
            description: "You must be signed in to update your profile.",
        });
        return;
    }

    try {
        await updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoPreviewUrl,
        });

        // This forces a re-fetch of the user in useUser hook
        await auth.currentUser.reload();
        
        toast({
            title: "Profile Updated!",
            description: "Your account information has been successfully updated.",
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "An error occurred while updating your profile.",
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Settings"
        description="Manage your team and account settings."
      />
      <div className="mt-8 max-w-2xl mx-auto grid gap-8">
        <form onSubmit={handleTeamBrandingSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Team Branding</CardTitle>
              <CardDescription>
                Customize your team's name and logo. This will be displayed in the sidebar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input id="teamName" name="teamName" value={teamNameInput} onChange={(e) => setTeamNameInput(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo-upload">Team Logo</Label>
                  <div className="flex items-center gap-4">
                    {teamLogoPreviewUrl ? (
                      <Image
                        src={teamLogoPreviewUrl}
                        alt="Team Logo Preview"
                        width={64}
                        height={64}
                        className="rounded-md object-cover size-16"
                      />
                    ) : (
                      <div className="size-16 rounded-md bg-muted flex items-center justify-center">
                        <Upload className="size-8 text-muted-foreground" />
                      </div>
                    )}
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleTeamLogoFileChange}
                      className="max-w-xs"
                    />
                  </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type="submit">Save Changes</Button>
            </CardFooter>
          </Card>
        </form>

        <form onSubmit={handleProfileSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Manage your personal account settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input id="displayName" name="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo-upload">Profile Photo</Label>
                  <div className="flex items-center gap-4">
                    {photoPreviewUrl ? (
                      <Image
                        src={photoPreviewUrl}
                        alt="Profile Photo Preview"
                        width={64}
                        height={64}
                        className="rounded-md object-cover size-16"
                      />
                    ) : (
                      <div className="size-16 rounded-md bg-muted flex items-center justify-center">
                        <Upload className="size-8 text-muted-foreground" />
                      </div>
                    )}
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoFileChange}
                      className="max-w-xs"
                    />
                  </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type="submit">Save Profile</Button>
            </CardFooter>
          </Card>
        </form>

      </div>
    </div>
  );
}
