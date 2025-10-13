import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { players } from "./data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function RosterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Team Roster" description={`Manage your ${players.length} players.`}>
        <Button>
            <PlusCircle className="mr-2 size-4"/>
            Add Player
        </Button>
      </PageHeader>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {players.map((player) => {
          const avatar = PlaceHolderImages.find((p) => p.id === player.avatarId);
          const overallSkill = Math.round(
            (Object.values(player.skillAssessments).reduce((a, b) => a + b, 0) /
              (Object.values(player.skillAssessments).length * 10)) * 100
          );
          return (
            <Card key={player.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="size-16">
                  <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint}/>
                  <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>#{player.number} {player.name}</CardTitle>
                  <CardDescription>{player.position}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                        <span>Overall Skill</span>
                        <span className="text-primary">{overallSkill}%</span>
                    </div>
                    <Progress value={overallSkill} />
                </div>
                <div className="text-sm space-y-2">
                    <p className="font-medium">Contact Info</p>
                    <p className="text-muted-foreground">{player.contact.email}</p>
                    <p className="text-muted-foreground">{player.contact.phone}</p>
                </div>
              </CardContent>
              <CardFooter>
                 <Button variant="secondary" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
