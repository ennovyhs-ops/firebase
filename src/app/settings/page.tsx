
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
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Upload } from "lucide-react";

const LOGO_STORAGE_KEY = "team-logo";
const TEAM_NAME_STORAGE_KEY = "team-name";

export default function SettingsPage() {
  const { toast } = useToast();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [teamName, setTeamName] = useState<string>("Sixx");

  useEffect(() => {
    const storedLogo = localStorage.getItem(LOGO_STORAGE_KEY);
    if (storedLogo) {
      setLogoUrl(storedLogo);
      setPreviewUrl(storedLogo);
    }
    const storedTeamName = localStorage.getItem(TEAM_NAME_STORAGE_KEY);
    if (storedTeamName) {
      setTeamName(storedTeamName);
    }
  }, []);

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

  const handleLogoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (previewUrl) {
      localStorage.setItem(LOGO_STORAGE_KEY, previewUrl);
      setLogoUrl(previewUrl);
      // Dispatch custom event to notify other components like the sidebar logo
      window.dispatchEvent(new CustomEvent('logoUpdated'));
      toast({
        title: "Logo Updated!",
        description: "Your new team logo has been saved.",
      });
    }
  };
  
    const handleNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTeamName = formData.get("teamName") as string;
    if (newTeamName) {
      localStorage.setItem(TEAM_NAME_STORAGE_KEY, newTeamName);
      setTeamName(newTeamName);
       window.dispatchEvent(new CustomEvent('teamNameUpdated'));
      toast({
        title: "Team Name Updated!",
        description: "Your new team name has been saved.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Settings"
        description="Manage your team's appearance and settings."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Logo</CardTitle>
            <CardDescription>
              Upload a logo for your team. This will be displayed in the sidebar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogoSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="logo-upload">Logo Image</Label>
                <div className="flex items-center gap-4">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Team Logo Preview"
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
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
                    onChange={handleFileChange}
                    className="max-w-xs"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save Logo</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team Name</CardTitle>
            <CardDescription>
              Set your team's name. This will be displayed in the sidebar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNameSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input id="teamName" name="teamName" defaultValue={teamName} required />
                </div>
                <div className="flex justify-end">
                    <Button type="submit">Save Name</Button>
                </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
