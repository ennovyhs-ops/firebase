"use server";

import { analyzePerformanceData } from "@/ai/flows/analyze-performance-data";
import { z } from "zod";

const formSchema = z.object({
  gameStatistics: z.string().min(10, "Please provide more detailed game statistics."),
  playerPerformanceData: z.string().min(10, "Please provide more detailed player performance data."),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  data?: Awaited<ReturnType<typeof analyzePerformanceData>>;
};

export async function onAnalyze(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: "Invalid form data",
      issues,
      fields: {
        gameStatistics: String(formData.gameStatistics ?? ""),
        playerPerformanceData: String(formData.playerPerformanceData ?? ""),
      }
    };
  }

  try {
    const result = await analyzePerformanceData(parsed.data);
    return { message: "Analysis complete.", data: result };
  } catch (error) {
    return {
      message: "An error occurred during analysis. Please try again.",
      fields: {
        gameStatistics: parsed.data.gameStatistics,
        playerPerformanceData: parsed.data.playerPerformanceData,
      }
    };
  }
}
