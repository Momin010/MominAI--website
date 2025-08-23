// Filename: /api/generate.ts (for a Vercel/Next.js environment)
// You'll need to install @google/genai in your backend environment

import { GoogleGenAI } from '@google/genai';

// IMPORTANT: Set your API_KEY in your deployment's environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are an expert web developer specializing in creating single-page React applications. The user will provide a prompt describing an application. Your task is to generate all the necessary files for a complete, self-contained, and runnable web application.

You MUST respond with ONLY a single JSON object. The JSON object must have two keys:
1. "thoughts": A brief, user-friendly explanation of the application you are about to create, written in a conversational tone. For example: "Okay, I'll create a simple counter application for you using React. It will have a main component to manage the state and buttons to increment and decrement the count."
2. "files": An array of objects, where each object represents a file and must have two keys: 'name' (a string with the full file path, e.g., 'index.html', 'src/index.tsx') and 'content' (a string containing the full source code for that file).

The generated application should not require any external server or build process to run; it must be runnable directly in the browser using ES modules via an import map pointing to a CDN like esm.sh. Ensure you provide a complete index.html, a root TSX file (e.g., src/index.tsx), and all necessary components. Do not include any text, markdown formatting, or explanations in your response other than the single JSON object.`;

// This is a generic handler that can be adapted for different serverless platforms
export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), { status: 400 });
    }
    
    const responseStream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { systemInstruction },
    });

    // Create a new readable stream to pipe the Gemini response through
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of responseStream) {
          const text = chunk.text;
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

// Configuration for Vercel Edge Functions
export const config = {
  runtime: 'edge',
};
