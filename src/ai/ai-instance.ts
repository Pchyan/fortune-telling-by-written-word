import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Function to get the API key from localStorage
function getApiKeyFromLocalStorage(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('google_genai_api_key');
  }
  return null;
}

// Attempt to get the API key from environment variables
let apiKey = process.env.GOOGLE_GENAI_API_KEY;

// If not found in environment variables, try localStorage
if (!apiKey) {
  apiKey = getApiKeyFromLocalStorage();
  if (!apiKey) {
    console.warn(
      'GOOGLE_GENAI_API_KEY not found in environment variables or localStorage.'
    );
  }
}

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: apiKey,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
