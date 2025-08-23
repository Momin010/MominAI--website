// /api/generate.ts

import { GoogleGenAI, Type } from "@google/genai";

// Configure the Vercel edge runtime
export const config = {
  runtime: 'edge',
};

// The main handler for the serverless function
export default async function handler(req: Request) {
  // Ensure the request is a POST request
  if (req.method !== 'POST') {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Check for the API key from environment variables
  if (!process.env.API_KEY) {
    return new Response(
      "API Key not found. Please set the API_KEY environment variable in your Vercel project.",
      { status: 500 }
    );
  }

  try {
    // Parse the chat history from the request body
    const { history } = await req.json();

    if (!history || !Array.isArray(history)) {
       return new Response("Invalid request body: 'history' array not found.", { status: 400 });
    }

    // Initialize the Google GenAI client
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Define the system instruction and JSON schema for the AI model
    const systemInstruction = `You are an expert web developer AI. Your task is to generate a complete, production-ready, single-page web application based on the user's prompt.
        
        RULES:
        1.  Always generate all necessary files, including index.html, index.tsx (or index.js), and a style file (e.g., index.css).
        2.  For React apps, use esm.sh for imports (e.g., "https://esm.sh/react").
        3.  The main script file must be imported in index.html as a module (e.g., <script type="module" src="/index.tsx"></script>). The path should be relative.
        4.  Your response MUST be a single, valid JSON object.
        5.  The JSON object must match this exact schema: { "files": [{ "name": "path/to/file.ext", "content": "file content" }] }. Do not include any other text, markdown, or explanations outside of the JSON object.`;
        
    const fileSchema = {
      type: Type.OBJECT,
      properties: {
        files: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              content: { type: Type.STRING },
            },
            required: ["name", "content"],
          },
        },
      },
      required: ["files"],
    };

    // Call the Gemini API in streaming mode
    const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: history.map(m => ({ role: m.role, parts: [{ text: m.text }]})),
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: fileSchema,
        },
    });

    // Create a new readable stream to send the response back to the client
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of responseStream) {
          const text = chunk.text;
          if (text) {
             controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    // Return the streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    });

  } catch (error) {
    console.error("Error in /api/generate:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(`An error occurred: ${errorMessage}`, { status: 500 });
  }
}
