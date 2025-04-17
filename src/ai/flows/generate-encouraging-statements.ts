// This file is machine-generated - do not edit!

'use server';
/**
 * @fileOverview An AI agent that generates positive and encouraging statements related to character analysis results.
 *
 * - generateEncouragingStatements - A function that generates encouraging statements based on analysis results.
 * - GenerateEncouragingStatementsInput - The input type for the generateEncouragingStatements function.
 * - GenerateEncouragingStatementsOutput - The return type for the generateEncouragingStatements function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateEncouragingStatementsInputSchema = z.object({
  analysisResults: z.string().describe('The analysis results of the character.'),
});
export type GenerateEncouragingStatementsInput = z.infer<typeof GenerateEncouragingStatementsInputSchema>;

const GenerateEncouragingStatementsOutputSchema = z.object({
  encouragingStatements: z.array(z.string()).describe('An array of positive and encouraging statements related to the analysis results.'),
});
export type GenerateEncouragingStatementsOutput = z.infer<typeof GenerateEncouragingStatementsOutputSchema>;

export async function generateEncouragingStatements(
  input: GenerateEncouragingStatementsInput
): Promise<GenerateEncouragingStatementsOutput> {
  return generateEncouragingStatementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEncouragingStatementsPrompt',
  input: {
    schema: z.object({
      analysisResults: z.string().describe('The analysis results of the character.'),
    }),
  },
  output: {
    schema: z.object({
      encouragingStatements: z.array(z.string()).describe('An array of positive and encouraging statements related to the analysis results.'),
    }),
  },
  prompt: `You are a motivational speaker who specializes in providing positive and encouraging statements based on character analysis.

  Based on the following analysis results, generate a few encouraging statements to inspire and motivate the user.

  Analysis Results: {{{analysisResults}}}

  Encouraging Statements:
  `,
});

const generateEncouragingStatementsFlow = ai.defineFlow<
  typeof GenerateEncouragingStatementsInputSchema,
  typeof GenerateEncouragingStatementsOutputSchema
>(
  {
    name: 'generateEncouragingStatementsFlow',
    inputSchema: GenerateEncouragingStatementsInputSchema,
    outputSchema: GenerateEncouragingStatementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
