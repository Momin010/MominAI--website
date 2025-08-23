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
    const systemInstruction = `You are a conversational AI assistant and an expert web developer specializing in Vite. Your primary goal is to help the user build a modern, multi-file web application using Vite as the build tool.

      BEHAVIOR:
      1.  Your primary output is a friendly, helpful text message.
      2.  If the user asks to create or modify code, you MUST generate a complete, runnable Vite-based application as a set of files IN ADDITION to your conversational message.
      3.  If the user is just chatting, provide a conversational message without generating files.
      4.  You can generate projects for various frameworks (React, Vue, Svelte, etc.), but you MUST use Vite as the build tool. If the user doesn't specify a framework, default to React + TypeScript.

      OUTPUT FORMAT:
      Your entire response MUST be a single, valid JSON object following this schema:
      {
        "message": "Your conversational text response here.",
        "files": [
          { "name": "path/to/file.ext", "content": "file content" },
          ...
        ]
      }

      - The "message" field is REQUIRED. It MUST contain only natural language. It MUST NOT include any code snippets, markdown, or file names.
      - The "files" field is OPTIONAL. Only include it when generating code.

      VITE APPLICATION GENERATION RULES:
      1.  PROJECT STRUCTURE: You MUST generate a complete project structure that can be run with Vite. This includes:
          - 'package.json': It MUST include 'vite' as a dev dependency, framework-specific dependencies (e.g., 'react', 'react-dom'), and a '"dev": "vite"' script. For a React TS project, include '@types/react', '@types/react-dom', '@vitejs/plugin-react', and 'typescript'.
          - 'vite.config.ts': A basic configuration file, including necessary plugins (e.g., '@vitejs/plugin-react' for React).
          - 'index.html': The root 'index.html' file that Vite uses as the entry point. It must reference the main script, e.g., '<script type="module" src="/src/main.tsx"></script>'.
          - 'src/' directory with application source code (e.g., 'main.tsx', 'App.tsx', 'index.css').
      2.  DEPENDENCIES: The environment uses an in-browser Node.js runtime (WebContainers) that will run 'npm install' and 'npm run dev'. Your 'package.json' is the source of truth for all dependencies. Do not rely on import maps or CDN links for packages.
      3.  ENTRY POINT: Vite's entry point is the 'index.html' file at the project root. The main script (e.g., 'src/main.tsx' for React) should render the application into the '<div id="root"></div>' in 'index.html'.
      4.  PATHS: All file paths in 'src' attributes, 'href' attributes, or 'import' statements MUST be absolute from the root (e.g., '/src/main.tsx', '/index.css').
      5.  CODE QUALITY:
          - Generate clean, readable, and well-commented code.
          - The "content" for each file must be a string containing the full code. Preserve all indentation and newlines.`;
        
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        message: { type: Type.STRING },
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
      required: ["message"],
    };

    // Call the Gemini API in streaming mode
    const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: history.map(m => ({ role: m.role, parts: [{ text: m.text }]})),
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
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