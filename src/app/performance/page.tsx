"use client";

import { useFormState, useFormStatus } from "react-dom";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader, Sparkles, Terminal } from "lucide-react";
import { onAnalyze, type FormState } from "./actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader className="mr-2 size-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 size-4" />
      )}
      Analyze Performance
    </Button>
  );
}

const initialState: FormState = {
  message: "",
};

export default function PerformancePage() {
  const [state, formAction] = useFormState(onAnalyze, initialState);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Performance Analysis"
        description="Leverage AI to get insights and recommendations from your team's data."
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <form action={formAction}>
            <Card>
              <CardHeader>
                <CardTitle>Input Data</CardTitle>
                <CardDescription>
                  Provide game and player data for analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gameStatistics">Game Statistics</Label>
                  <Textarea
                    id="gameStatistics"
                    name="gameStatistics"
                    placeholder="e.g., Team A vs Team B, Final Score: 102-98. Player stats..."
                    className="min-h-[120px]"
                    defaultValue={state.fields?.gameStatistics}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="playerPerformanceData">
                    Player Performance Data
                  </Label>
                  <Textarea
                    id="playerPerformanceData"
                    name="playerPerformanceData"
                    placeholder="e.g., Player: John Doe, Strengths: 3pt shooting, Weaknesses: Defensive rebounds..."
                    className="min-h-[120px]"
                    defaultValue={state.fields?.playerPerformanceData}
                  />
                </div>
                {state.issues && (
                  <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Invalid Input</AlertTitle>
                    <AlertDescription>
                      <ul>
                        {state.issues.map((issue) => (
                          <li key={issue}>- {issue}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </Card>
          </form>
        </div>

        <div className="lg:col-span-2">
          <Card className="min-h-full">
            <CardHeader>
              <CardTitle>AI Analysis & Recommendations</CardTitle>
              <CardDescription>
                Results from the AI performance analysis will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {state.data ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg text-primary">Overall Team Analysis</h3>
                    <p className="text-muted-foreground">{state.data.overallTeamAnalysis}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary">Strategic Adjustments</h3>
                    <p className="text-muted-foreground">{state.data.strategicAdjustments}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary">Player-Specific Recommendations</h3>
                    <Accordion type="single" collapsible className="w-full">
                        {Object.entries(state.data.playerSpecificRecommendations).map(([player, recommendation]) => (
                            <AccordionItem value={player} key={player}>
                                <AccordionTrigger>{player}</AccordionTrigger>
                                <AccordionContent>
                                {recommendation}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                  </div>
                </div>
              ) : (
                <div className="flex h-[300px] items-center justify-center rounded-lg border-2 border-dashed">
                  <div className="text-center text-muted-foreground">
                    <Sparkles className="mx-auto mb-2 size-10" />
                    <p>Your analysis results will be displayed here.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
