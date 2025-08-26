// /api/ai.ts

import { GoogleGenAI, Type } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

// Configure the Vercel nodejs runtime
export const config = {
  runtime: 'nodejs',
  maxDuration: 300, 
};

// Initialize the Google GenAI client once
let ai: GoogleGenAI;
try {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} catch (e) {
    console.error("Failed to initialize GoogleGenAI:", e);
}


// --- Task Handlers ---

const handleChat = async (payload: any): Promise<ReadableStream> => {
    const { history } = payload;
    if (!history || !Array.isArray(history)) {
        throw new Error("Invalid payload: 'history' array not found for chat task.");
    }
    
    const systemInstruction = `You are an expert pair programming assistant in a web-based IDE. Your response format depends entirely on the user's request.

**Scenario 1: The user asks to write, create, update, or modify code.**
In this case, you MUST ONLY output a single, raw JSON object. Do not include markdown fences (\`\`\`json) or any other text, conversation, or explanation before or after the JSON object. Your entire response must be the JSON object itself.

The JSON object must have this exact structure:
{
  "explanation": "A concise, well-formatted markdown string explaining the changes you made.",
  "actions": [
    {
      "action": "create" | "update",
      "path": "/path/to/the/file.js",
      "content": "The ENTIRE new content of the file."
    }
  ]
}

**Scenario 2: The user asks a general question, for an explanation, or anything that does not involve changing files.**
In this case, respond with a helpful, friendly answer in standard Markdown format. Do NOT use the JSON format for these requests.`;

    const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: history.map((m: any) => ({ role: m.role, parts: [{ text: m.text }] })),
        config: { systemInstruction }
    });
    
    // Convert the AsyncGenerator to a ReadableStream
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            for await (const chunk of responseStream) {
                controller.enqueue(encoder.encode(chunk.text));
            }
            controller.close();
        },
    });

    return stream;
};

// Generic handler for non-streaming, JSON-based requests
const handleTool = async (prompt: string, config: any = {}): Promise<GenerateContentResponse> => {
    return ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: config
    });
};


// --- Main Handler ---

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response("Method Not Allowed", { status: 405 });
    }

    if (!ai) {
        return new Response("AI client not initialized. Check server logs.", { status: 500 });
    }

    try {
        const { task, payload } = await req.json();

        if (task === 'chat_stream') {
            const stream = await handleChat(payload);
            return new Response(stream, {
                headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            });
        }
        
        // Non-streaming tasks
        let prompt;
        let genConfig: any = {};
        
        switch (task) {
            case 'generateCodeForFile':
                prompt = `You are an expert programmer. A user wants to create a file named "${payload.fileName}". Based on their request, generate the complete, production-ready code for this file. Do not add any conversational text, explanations, or markdown formatting like \`\`\` around the code. Only output the raw code for the file content.\nUser's request: "${payload.userPrompt}"`;
                break;
            // Add other non-streaming tasks here...
            default:
                return new Response(JSON.stringify({ error: `Unknown task: ${task}` }), { status: 400 });
        }
        
        const response = await handleTool(prompt, genConfig);
        
        return new Response(JSON.stringify({ text: response.text }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error(`Error in /api/ai for task:`, error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return new Response(JSON.stringify({ error: `An error occurred: ${errorMessage}` }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}