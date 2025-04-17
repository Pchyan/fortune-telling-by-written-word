'use server';
/**
 * @fileOverview Analyzes the structure and strokes of a given Chinese character, providing interpretations and advice based on 測字 theories.
 *
 * - analyzeTextStructure - A function that handles the text structure analysis process.
 * - AnalyzeTextStructureInput - The input type for the analyzeTextStructure function.
 * - AnalyzeTextStructureOutput - The return type for the analyzeTextStructure function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeTextStructureInputSchema = z.object({
  text: z.string().describe('The Chinese character to analyze.'),
});
export type AnalyzeTextStructureInput = z.infer<typeof AnalyzeTextStructureInputSchema>;

const AnalyzeTextStructureOutputSchema = z.object({
  analysis: z.string().describe('The analysis of the text structure and strokes.'),
  interpretations: z.array(z.string()).describe('Possible interpretations of the character.'),
  advice: z.string().describe('Advice based on the analysis and interpretations.'),
});
export type AnalyzeTextStructureOutput = z.infer<typeof AnalyzeTextStructureOutputSchema>;

export async function analyzeTextStructure(input: AnalyzeTextStructureInput): Promise<AnalyzeTextStructureOutput> {
  return analyzeTextStructureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTextStructurePrompt',
  input: {
    schema: z.object({
      text: z.string().describe('The Chinese character to analyze.'),
    }),
  },
  output: {
    schema: z.object({
      analysis: z.string().describe('The analysis of the text structure and strokes.'),
      interpretations: z.array(z.string()).describe('Possible interpretations of the character.'),
      advice: z.string().describe('Advice based on the analysis and interpretations.'),
    }),
  },
  prompt: `You are an expert in Chinese character divination (測字). Analyze the structure and strokes of the given Chinese character and provide several possible interpretations and advice based on traditional 測字 theories.\n\nCharacter: {{{text}}}\n\nRespond in Traditional Chinese. Format the response as a JSON object with "analysis", "interpretations", and "advice" fields.`,
});

const analyzeTextStructureFlow = ai.defineFlow<
  typeof AnalyzeTextStructureInputSchema,
  typeof AnalyzeTextStructureOutputSchema
>(
  {
    name: 'analyzeTextStructureFlow',
    inputSchema: AnalyzeTextStructureInputSchema,
    outputSchema: AnalyzeTextStructureOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
