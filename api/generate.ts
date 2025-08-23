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
    const systemInstruction = `You are a conversational AI assistant and an expert web developer. Your primary goal is to help the user build a web application through natural conversation.

      BEHAVIOR:
      1.  Your primary output is a friendly, helpful text message.
      2.  If the user asks to create or modify code, generate the necessary files IN ADDITION to your conversational message.
      3.  If the user is just chatting, provide a conversational message without generating files.

      OUTPUT FORMAT:
      Your entire response MUST be a single, valid JSON object following this schema:
      {
        "message": "Your conversational text response here.",
        "files": [
          { "name": "path/to/file.ext", "content": "file content" },
          ...
        ]
      }

      - The "message" field is REQUIRED. It MUST contain only natural language. It MUST NOT include any code snippets, markdown code blocks (\`\`\`), or file names enclosed in backticks (\`\`). Your conversational response should be separate from the code itself.
      - The "files" field is OPTIONAL. Only include it when generating code.

      CODE GENERATION RULES:
      1.  Always generate a complete, runnable, single-page web application.
      2.  The "content" for each file must be a string containing the full code, with proper indentation and newlines preserved. DO NOT write minified or single-line code.
      3.  All file paths in script 'src' or link 'href' attributes MUST be absolute from the root (e.g., '/index.tsx', '/styles.css').

      For React/TSX/JSX applications:
      a. The generated 'index.html' file's <head> MUST include these three script tags in this exact order:
          <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      b. The main script file (e.g., index.tsx) MUST be included in the <body> of 'index.html' with type="text/babel". Example: <script type="text/babel" src="/index.tsx"></script>.
      c. Do NOT use 'import' or 'export' statements in the TSX/JSX files. Use the global 'React' and 'ReactDOM' objects (e.g., React.useState, ReactDOM.createRoot). The scripts included in the head make these available.
      d. The root element for React should be '<div id="root"></div>' in the body.

      For non-React (plain HTML/CSS/JS) applications:
      a. The main script MUST be included with type="module". Example: <script type="module" src="/index.js"></script>.
      b. The CSS file MUST be linked with an absolute path. Example: <link rel="stylesheet" href="/styles.css">.`;
        
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