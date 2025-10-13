'use server';

/**
 * @fileOverview Analyzes game statistics and player performance data to identify areas for improvement and provide personalized recommendations.
 *
 * - analyzePerformanceData - A function that handles the analysis of performance data and generates recommendations.
 * - AnalyzePerformanceDataInput - The input type for the analyzePerformanceData function.
 * - AnalyzePerformanceDataOutput - The return type for the analyzePerformanceData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePerformanceDataInputSchema = z.object({
  gameStatistics: z
    .string()
    .describe('Detailed game statistics, including player-specific data such as points, assists, rebounds, etc.'),
  playerPerformanceData: z
    .string()
    .describe('Comprehensive player performance data, including metrics like skill ratings, consistency scores, and areas of strength and weakness.'),
});
export type AnalyzePerformanceDataInput = z.infer<typeof AnalyzePerformanceDataInputSchema>;

const AnalyzePerformanceDataOutputSchema = z.object({
  overallTeamAnalysis: z
    .string()
    .describe('An overview of the team performance, identifying key strengths and areas needing improvement.'),
  playerSpecificRecommendations: z
    .record(z.string(), z.string())
    .describe(
      'A record of personalized recommendations for each player, keyed by player name. Each recommendation should provide actionable steps for improvement.'
    ),
  strategicAdjustments: z
    .string()
    .describe('Strategic adjustments for upcoming games, based on the analyzed data and recommendations.'),
});
export type AnalyzePerformanceDataOutput = z.infer<typeof AnalyzePerformanceDataOutputSchema>;

export async function analyzePerformanceData(input: AnalyzePerformanceDataInput): Promise<AnalyzePerformanceDataOutput> {
  return analyzePerformanceDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePerformanceDataPrompt',
  input: {schema: AnalyzePerformanceDataInputSchema},
  output: {schema: AnalyzePerformanceDataOutputSchema},
  prompt: `You are an expert sports analyst specializing in basketball. Your task is to analyze game statistics and player performance data to identify areas for improvement and provide personalized recommendations for each player.

Analyze the following game statistics:
{{gameStatistics}}

Analyze the following player performance data:
{{playerPerformanceData}}

Based on your analysis, provide the following:

1.  Overall Team Analysis: An overview of the team performance, identifying key strengths and areas needing improvement.
2.  Player-Specific Recommendations: A record of personalized recommendations for each player. Each recommendation should provide actionable steps for improvement. The keys of the record are player names.
3.  Strategic Adjustments: Strategic adjustments for upcoming games, based on the analyzed data and recommendations.

Ensure that the player names used in PlayerSpecificRecommendations are accurate and match the players in the provided data.

Output the result in JSON format as defined by the AnalyzePerformanceDataOutputSchema.
`,
});

const analyzePerformanceDataFlow = ai.defineFlow(
  {
    name: 'analyzePerformanceDataFlow',
    inputSchema: AnalyzePerformanceDataInputSchema,
    outputSchema: AnalyzePerformanceDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
