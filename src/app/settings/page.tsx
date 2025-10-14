
"use client";

import { useState, useEffect, FormEvent } from "react";
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

const LOGO_STORAGE_KEY = "team-logo";
const TEAM_NAME_STORAGE_KEY = "team-name";

export default function SettingsPage() {
  const { toast } = useToast();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [teamNameInput, setTeamNameInput] = useState<string>("");

  useEffect(() => {
    const storedLogo = localStorage.getItem(LOGO_STORAGE_KEY);
    if (storedLogo) {
      setPreviewUrl(storedLogo);
    }
    const storedTeamName = localStorage.getItem(TEAM_NAME_STORAGE_KEY);
    if (storedTeamName) {
      setTeamNameInput(storedTeamName);
    } else {
      setTeamNameInput("Sixx");
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Save Team Name
    if (teamNameInput) {
      localStorage.setItem(TEAM_NAME_STORAGE_KEY, teamNameInput);
      window.dispatchEvent(new CustomEvent('teamNameUpdated'));
    }

    // Save Logo
    if (previewUrl) {
      localStorage.setItem(LOGO_STORAGE_KEY, previewUrl);
      window.dispatchEvent(new CustomEvent('logoUpdated'));
    }

    toast({
      title: "Settings Saved!",
      description: "Your team branding has been updated.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Settings"
        description="Manage your team's appearance and settings."
      />
      <div className="mt-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
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
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
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
                      onChange={handleFileChange}
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
      </div>
    </div>
  );
}
