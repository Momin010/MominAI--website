
import type { Diagnostic, DependencyReport } from '../types';

// Generic fetch handler for AI tasks
async function fetchAiTask(task: string, payload: any): Promise<any> {
    try {
        const response = await fetch('/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task, payload }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error in AI task '${task}':`, error);
        throw error; // Re-throw to be caught by the caller
    }
}

// Handler for streaming chat responses
export async function* streamAIResponse(history: any[]): AsyncGenerator<string> {
    try {
        const response = await fetch('/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: 'chat_stream', payload: { history } }),
        });

        if (!response.ok || !response.body) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Request failed with status ${response.status}`);
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            yield decoder.decode(value);
        }

    } catch (error) {
        console.error("Error getting AI stream response:", error);
        yield `\n\n**AI Service Error:**\n${error instanceof Error ? error.message : 'An unknown error occurred.'}\n\nPlease check server logs for more details.`;
    }
}


export const generateCodeForFile = async (userPrompt: string, fileName: string): Promise<string> => {
    const data = await fetchAiTask('generateCodeForFile', { userPrompt, fileName });
    return data.text.trim();
};

export const getInlineCodeSuggestion = async (codeBeforeCursor: string): Promise<string> => {
    if (codeBeforeCursor.trim().length < 10) return "";
    const data = await fetchAiTask('getInlineCodeSuggestion', { codeBeforeCursor });
    return data.text;
};

export interface AIFixResponse {
    filePath: string;
    fixedCode: string;
    explanation: string;
    detailedExplanation: string;
}

export const fixCodeWithAI = async (
    errorMessage: string,
    files: {path: string, content: string}[],
    entryPointFile?: string
): Promise<AIFixResponse> => {
    return fetchAiTask('fixCodeWithAI', { errorMessage, files, entryPointFile });
}

export const getSuggestedFix = async (fileContent: string, problem: Diagnostic, activeFile: string): Promise<string> => {
    const data = await fetchAiTask('getSuggestedFix', { fileContent, problem, activeFile });
    return data.text;
};

export const getCodeExplanation = async (code: string): Promise<string> => {
    const data = await fetchAiTask('getCodeExplanation', { code });
    return data.text;
};

export const analyzeCodeForBugs = async (code: string): Promise<Omit<Diagnostic, 'source'>[]> => {
    return fetchAiTask('analyzeCodeForBugs', { code });
};

export const generateMermaidDiagram = async (code: string): Promise<string> => {
    const data = await fetchAiTask('generateMermaidDiagram', { code });
    return data.text.replace(/```mermaid\n|```/g, '').trim();
};

export const generateTestFile = async (code: string, filePath: string): Promise<string> => {
    const data = await fetchAiTask('generateTestFile', { code, filePath });
    return data.text.trim();
};

export const optimizeCss = async (css: string): Promise<string> => {
    const data = await fetchAiTask('optimizeCss', { css });
    return data.text.trim();
};

export const generateCommitMessage = async (files: {path: string, content: string}[]): Promise<string> => {
    const data = await fetchAiTask('generateCommitMessage', { files });
    return data.text.trim();
};

export const generateRegex = async (description: string): Promise<string> => {
    const data = await fetchAiTask('generateRegex', { description });
    return data.text.trim();
};

export const generateDocsForCode = async (code: string, filePath: string): Promise<string> => {
    const data = await fetchAiTask('generateDocsForCode', { code, filePath });
    return data.text.trim();
};

export const generateTheme = async (description: string): Promise<Record<string, string>> => {
    return fetchAiTask('generateTheme', { description });
};

export const migrateCode = async (code: string, from: string, to: string): Promise<string> => {
    const data = await fetchAiTask('migrateCode', { code, from, to });
    return data.text.trim();
};

export const generateCodeFromImage = async (base64Image: string, prompt: string): Promise<string> => {
    const data = await fetchAiTask('generateCodeFromImage', { base64Image, prompt });
    return data.text.trim();
};

export const scaffoldProject = async (prompt: string): Promise<Record<string, string>> => {
    return fetchAiTask('scaffoldProject', { prompt });
};

export const analyzeDependencies = async (packageJsonContent: string): Promise<DependencyReport> => {
    return fetchAiTask('analyzeDependencies', { packageJsonContent });
};

export const generateCodeFromFigma = async (fileUrl: string, token: string, userPrompt: string): Promise<string> => {
    const data = await fetchAiTask('generateCodeFromFigma', { fileUrl, token, userPrompt });
    return data.text.trim();
};

export const reviewCode = async (code: string): Promise<Omit<Diagnostic, 'source'>[]> => {
    return fetchAiTask('reviewCode', { code });
};


export const deployProject = async (): Promise<{ url: string; success: boolean; message: string }> => {
    const result = await fetchAiTask('deployProject', {});
    return { ...result, success: true };
};

export const updateCssInProject = async (
    files: { path: string; content: string }[],
    selector: string,
    newStyles: Record<string, string>
): Promise<{ filePath: string, updatedCode: string }> => {
    return fetchAiTask('updateCssInProject', { files, selector, newStyles });
};

export const generateShellCommand = async (prompt: string): Promise<string> => {
    const data = await fetchAiTask('generateShellCommand', { prompt });
    return data.text.trim();
};

export const generateComponentSet = async (componentName: string, description: string): Promise<{ files: { name: string, content: string }[] }> => {
    return fetchAiTask('generateComponentSet', { componentName, description });
};