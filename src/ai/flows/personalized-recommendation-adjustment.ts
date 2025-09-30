// src/ai/flows/personalized-recommendation-adjustment.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for adjusting healthcare recommendations based on anonymized past results and clustered symptom data.
 *
 * - adjustRecommendations - A function that takes initial recommendations and user symptoms to re-rank the recommendations.
 * - AdjustRecommendationsInput - The input type for the adjustRecommendations function.
 * - AdjustRecommendationsOutput - The return type for the adjustRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustRecommendationsInputSchema = z.object({
  symptoms: z.string().describe('The symptoms entered by the user.'),
  initialRecommendations: z.array(z.string()).describe('The initial list of recommended conditions/treatments.'),
  pastResults: z.string().optional().describe('Anonymized past results from other users with similar symptoms.'),
  clusteredSymptomData: z.string().optional().describe('Clustered symptom data providing insights into related conditions.'),
});
export type AdjustRecommendationsInput = z.infer<typeof AdjustRecommendationsInputSchema>;

const AdjustRecommendationsOutputSchema = z.array(z.string()).describe('The re-ranked list of recommended conditions/treatments.');
export type AdjustRecommendationsOutput = z.infer<typeof AdjustRecommendationsOutputSchema>;

export async function adjustRecommendations(input: AdjustRecommendationsInput): Promise<AdjustRecommendationsOutput> {
  return adjustRecommendationsFlow(input);
}

const adjustRecommendationsPrompt = ai.definePrompt({
  name: 'adjustRecommendationsPrompt',
  input: {schema: AdjustRecommendationsInputSchema},
  output: {schema: AdjustRecommendationsOutputSchema},
  prompt: `You are an AI assistant specializing in healthcare recommendations.

  A user has entered the following symptoms: {{{symptoms}}}

  The initial recommended conditions/treatments are: {{#each initialRecommendations}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Based on anonymized past results from users with similar symptoms:
  {{#if pastResults}}
  {{{pastResults}}}
  {{else}}
  No past results available.
  {{/if}}

  And clustered symptom data providing insights into related conditions:
  {{#if clusteredSymptomData}}
  {{{clusteredSymptomData}}}
  {{else}}
  No clustered symptom data available.
  {{/if}}

  Re-rank the initial recommendations to better reflect the user's likely condition, and include related conditions based on the provided data. Return the re-ranked list.
  Ensure the output is a JSON array of strings.
  `,
});

const adjustRecommendationsFlow = ai.defineFlow(
  {
    name: 'adjustRecommendationsFlow',
    inputSchema: AdjustRecommendationsInputSchema,
    outputSchema: AdjustRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await adjustRecommendationsPrompt(input);
    return output!;
  }
);

