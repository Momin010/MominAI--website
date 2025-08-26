





import { GoogleGenAI, Type } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";
import type { Diagnostic, DependencyReport, FileAction, AIFixResponse } from '../types';

const getAiClient = (apiKey: string | null): GoogleGenAI => {
    if (!apiKey) {
        throw new Error("Gemini API key not found. Please set it in the settings panel.");
    }
    try {
        return new GoogleGenAI({ apiKey });
    } catch (e) {
        console.error("Failed to initialize GoogleGenAI:", e);
        throw new Error("Failed to initialize Gemini AI. The API key might be invalid.");
    }
};


// Handler for streaming chat responses
export async function* streamAIResponse(history: {role: string, text: string}[], apiKey: string | null): AsyncGenerator<string> {
    const ai = getAiClient(apiKey);

    const systemInstruction = `You are an expert pair programming assistant in a web-based IDE. Your response format depends entirely on the user's request.

**Scenario 1: The user asks to write, create, update, or modify code.**
In this case, you MUST ONLY output a single, raw JSON object. Do not include markdown fences (\`\`\`json) or any other text, conversation, or explanation before or after the JSON object. Your entire response must be the JSON object.

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

    try {
        const contents = history.map(m => ({ role: m.role, parts: [{ text: m.text }] }));

        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents,
            config: { systemInstruction }
        });
        
        for await (const chunk of responseStream) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error getting AI stream response:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        if (errorMessage.includes('API key not valid')) {
             yield `\n\n**AI Service Error:**\nInvalid Gemini API key. Please check the key in your settings.`;
        } else {
            yield `\n\n**AI Service Error:**\n${errorMessage}`;
        }
    }
}


export const generateCodeForFile = async (userPrompt: string, fileName: string, apiKey: string | null): Promise<string> => {
    const ai = getAiClient(apiKey);
    const prompt = `You are an expert programmer. A user wants to create a file named "${fileName}". Based on their request, generate the complete, production-ready code for this file. Do not add any conversational text, explanations, or markdown formatting like \`\`\` around the code. Only output the raw code for the file content.\nUser's request: "${userPrompt}"`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return response.text.trim();
};

export const getInlineCodeSuggestion = async (codeBeforeCursor: string, apiKey: string | null): Promise<string> => {
    if (codeBeforeCursor.trim().length < 10) return "";
    const ai = getAiClient(apiKey);
    const prompt = `You are an AI code completion assistant. Given the code before the cursor, provide a single-line or multi-line code completion. Only output the code to be completed, with no explanation or markdown.\n\n---\n\n${codeBeforeCursor}`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt, config: { stopSequences: ['\n'] } });
    return response.text;
};

export const fixCodeWithAI = async (
    errorMessage: string,
    files: {path: string, content: string}[],
    apiKey: string | null,
): Promise<AIFixResponse> => {
    const ai = getAiClient(apiKey);
    const prompt = `You are an expert software debugger. A user has encountered an error in their web application. Your task is to analyze the error message and the provided project files to identify the root cause and provide a fix.

The user's error message is:
\`\`\`
${errorMessage}
\`\`\`

Here are the project files:
${files.map((f: any) => `--- FILE: ${f.path} ---\n${f.content}`).join('\n\n')}

Based on your analysis, you MUST provide a fix by responding ONLY with a single raw JSON object with the following structure:
{
  "explanation": "A concise, well-formatted markdown explanation of the bug and your proposed fix.",
  "actions": [
    {
      "action": "update",
      "path": "/path/to/the/file/to/modify.js",
      "content": "The ENTIRE new content of the modified file."
    }
  ]
}
Do not include any other text, conversation, or markdown fences before or after the JSON object. Your entire response must be the JSON object.`;

    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    
    try {
        let responseText = response.text;
        const jsonMatch = responseText.match(/({[\s\S]*})/);
        if (jsonMatch) {
            responseText = jsonMatch[1];
            return JSON.parse(responseText);
        }
        throw new Error("AI response was not valid JSON.");
    } catch (e) {
         console.error("Failed to parse JSON from AI fix response:", response.text, e);
         throw new Error("AI returned an invalid response. Please try again.");
    }
}

export const getSuggestedFix = async (fileContent: string, problem: Diagnostic, activeFile: string, apiKey: string | null): Promise<string> => {
    const ai = getAiClient(apiKey);
    const prompt = `Given the file "${activeFile}" with the following content:\n\n${fileContent}\n\nThere's an issue on line ${problem.line}: "${problem.message}". The problematic line content is: "${fileContent.split('\n')[problem.line - 1]}". Provide a single line of code that fixes this issue. Do not provide explanation or markdown.`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return response.text.trim();
};

export const generateComponentSet = async (componentName: string, description: string, apiKey: string | null): Promise<{ files: { name: string, content: string }[] }> => {
    const ai = getAiClient(apiKey);
    const prompt = `Generate a set of files for a new React component named "${componentName}". The component should be written in TypeScript with JSX (.tsx) and include a basic test file (.test.tsx) and a CSS module file (.module.css). The component should be based on this description: "${description}". Your output must be a single raw JSON object with the structure: {"files": [{"name": "FileName.tsx", "content": "File content here..."}, ...]}`;
    
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    
    try {
        const jsonMatch = response.text.match(/({[\s\S]*})/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[1]);
        }
        throw new Error("AI response was not valid JSON for component set.");
    } catch(e) {
        console.error("Failed to parse component set from AI:", response.text, e);
        throw new Error("AI returned an invalid response for the component set.");
    }
};

// --- Mocked / Passthrough services ---

export const deployProject = async (): Promise<{ url: string; success: boolean; message: string }> => {
    // This is a mock function and does not use the AI.
    return new Promise(resolve => setTimeout(() => {
        resolve({
            url: `https://mock-deploy-${Math.random().toString(36).substring(2, 8)}.mominai.app`,
            success: true,
            message: "Project deployed successfully!"
        });
    }, 2000));
};

// --- Placeholder stubs for other AI services ---

const simpleAITask = async (prompt: string, apiKey: string | null): Promise<string> => {
    const ai = getAiClient(apiKey);
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return response.text.trim();
};

export const getCodeExplanation = async (code: string, apiKey: string | null): Promise<string> => simpleAITask(`Explain this code snippet:\n\`\`\`\n${code}\n\`\`\``, apiKey);

export const analyzeCodeForBugs = async (code: string, apiKey: string | null): Promise<Omit<Diagnostic, 'source'>[]> => {
    // This is a complex task. Returning an empty array for now.
    console.warn("analyzeCodeForBugs is not fully implemented.");
    return Promise.resolve([]);
};

export const generateMermaidDiagram = async (code: string, apiKey: string | null): Promise<string> => simpleAITask(`Generate a Mermaid.js diagram to represent this code's structure:\n\n${code}`, apiKey);

export const generateTestFile = async (code: string, filePath: string, apiKey: string | null): Promise<string> => simpleAITask(`Generate a test file for the following code from "${filePath}":\n\n${code}`, apiKey);

export const optimizeCss = async (css: string, apiKey: string | null): Promise<string> => simpleAITask(`Optimize the following CSS:\n\n${css}`, apiKey);

export const generateCommitMessage = async (files: {path: string, content: string}[], apiKey: string | null): Promise<string> => simpleAITask(`Generate a conventional commit message for these file changes:\n\n${files.map(f => `Path: ${f.path}\nContent:\n${f.content}`).join('\n---\n')}`, apiKey);

export const generateRegex = async (description: string, apiKey: string | null): Promise<string> => simpleAITask(`Generate a JavaScript regex for: "${description}"`, apiKey);

export const generateDocsForCode = async (code: string, filePath: string, apiKey: string | null): Promise<string> => simpleAITask(`Generate Markdown documentation for the code in "${filePath}":\n\n${code}`, apiKey);

export const generateTheme = async (description: string, apiKey: string | null): Promise<Record<string, string>> => {
    // This is a complex task. Returning a placeholder.
    console.warn("generateTheme is not fully implemented.");
    return Promise.resolve({ '--background': '#1a202c', '--foreground': '#e2e8f0', '--accent': '#63b3ed' });
};

export const migrateCode = async (code: string, from: string, to: string, apiKey: string | null): Promise<string> => simpleAITask(`Migrate this code from ${from} to ${to}:\n\n${code}`, apiKey);

export const generateCodeFromImage = async (base64Image: string, prompt: string, apiKey: string | null): Promise<string> => {
    const ai = getAiClient(apiKey);
    const imagePart = { inlineData: { mimeType: 'image/jpeg', data: base64Image } };
    const textPart = { text: `Generate HTML and CSS for this image. User hint: "${prompt}"` };
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: { parts: [imagePart, textPart] }});
    return response.text.trim();
};

export const scaffoldProject = async (prompt: string, apiKey: string | null): Promise<Record<string, string>> => {
    // This is a complex task. Returning placeholder.
    console.warn("scaffoldProject is not fully implemented.");
    return Promise.resolve({ 'index.html': '<h1>Hello World</h1>', 'style.css': 'h1 { color: blue; }' });
};

export const analyzeDependencies = async (packageJsonContent: string, apiKey: string | null): Promise<DependencyReport> => {
    // This is a complex task. Returning placeholder.
    console.warn("analyzeDependencies is not fully implemented.");
    return Promise.resolve({ dependencies: [], devDependencies: [] });
};

export const generateCodeFromFigma = async (fileUrl: string, token: string, userPrompt: string, apiKey: string | null): Promise<string> => {
     console.warn("generateCodeFromFigma is a placeholder.");
    return Promise.resolve(`<h1>Figma Import for ${fileUrl}</h1><p>${userPrompt}</p>`);
};

export const reviewCode = async (code: string, apiKey: string | null): Promise<Omit<Diagnostic, 'source'>[]> => {
    console.warn("reviewCode is not fully implemented.");
    return Promise.resolve([]);
};

export const updateCssInProject = async (files: { path: string; content: string }[], selector: string, newStyles: Record<string, string>, apiKey: string | null): Promise<{ filePath: string, updatedCode: string }> => {
    console.warn("updateCssInProject is not fully implemented.");
    const cssFile = files.find(f => f.path.endsWith('.css'));
    return Promise.resolve({ filePath: cssFile?.path || 'style.css', updatedCode: cssFile?.content || '' });
};

export const generateShellCommand = async (prompt: string, apiKey: string | null): Promise<string> => simpleAITask(`Generate a single shell command for: "${prompt}"`, apiKey);