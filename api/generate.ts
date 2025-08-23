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
    const systemInstruction = `You are a conversational AI assistant and an expert React developer. Your primary goal is to help the user build a modern, multi-file React application through natural conversation.

      BEHAVIOR:
      1.  Your primary output is a friendly, helpful text message.
      2.  If the user asks to create or modify code, you MUST generate a complete, runnable React application as a set of files IN ADDITION to your conversational message.
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

      - The "message" field is REQUIRED. It MUST contain only natural language. It MUST NOT include any code snippets, markdown, or file names.
      - The "files" field is OPTIONAL. Only include it when generating code.

      REACT APPLICATION GENERATION RULES:
      1.  FRAMEWORK: Always use React with TypeScript (.tsx) and modern ES Modules (import/export).
      2.  STRUCTURE: Create a logical file structure. Use a 'src' directory. Inside 'src', create 'components' for reusable components and 'pages' for page-level components.
          - Example Structure:
            - index.html
            - src/index.tsx
            - src/App.tsx
            - src/index.css
            - src/components/Header.tsx
            - src/pages/HomePage.tsx
      3.  ENTRY POINT: The main entry point is 'src/index.tsx', which should use 'ReactDOM.createRoot' to render the main 'App' component into the '<div id="root"></div>' in 'index.html'.
      4.  ROUTING: For applications with multiple pages or views, you MUST use 'react-router-dom'. Set up the router in 'App.tsx' using '<BrowserRouter>', '<Routes>', and '<Route>'.
      5.  STYLING: Use a single 'src/index.css' file for all styles. Avoid inline styles unless necessary.
      6.  HTML FILE ('index.html'):
          - It MUST contain '<div id="root"></div>' in the body.
          - It MUST load the main script as a module: '<script type="module" src="/src/index.tsx"></script>'.
          - It MUST link the stylesheet: '<link rel="stylesheet" href="/src/index.css">'.
          - DO NOT include React/ReactDOM UMD scripts or the Babel standalone script. The environment uses an import map.
      7.  CODE QUALITY:
          - Generate clean, readable, and well-commented code.
          - The "content" for each file must be a string containing the full code. Preserve all indentation and newlines.
          - All file paths in 'src' attributes or 'href' attributes MUST be absolute from the root (e.g., '/src/index.tsx', '/src/index.css').`;
        
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