import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AppFile, ChatMessage } from '../types.ts';
import { useLocalStorageState } from '../../../hooks/useLocalStorageState.ts';

const API_ENDPOINT = '/api/generate';

const initialChat: ChatMessage[] = [{
    role: 'model',
    text: "Hello! I'm MominAI. Describe the application or website you want to build, and I'll generate the code for you."
}];

export const useIDEState = () => {
    const [files, setFiles, clearFiles] = useLocalStorageState<AppFile[]>('ide_files', []);
    const [activeFileName, setActiveFileName, clearActiveFile] = useLocalStorageState<string | null>('ide_active_file', null);
    const [prompt, setPrompt] = useState('');
    const [chatHistory, setChatHistory, clearChatHistory] = useLocalStorageState<ChatMessage[]>('ide_chat_history', initialChat);
    const [isLoading, setIsLoading] = useState(false);
    const [isApiConfigured, setIsApiConfigured] = useState(true);

    // Register service worker on initial load
    useEffect(() => {
        const registerSW = async () => {
            if ('serviceWorker' in navigator) {
                try {
                    await navigator.serviceWorker.register('/sw.js', { scope: '/' });
                    console.log('Service Worker registered');
                } catch (error) {
                    console.error('Service Worker registration failed:', error);
                }
            }
        };
        registerSW();
    }, []);

    const handlePromptSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: prompt };
        // Immediately add the user's message and an empty model message for the "thinking" UI
        setChatHistory(prev => [...prev, userMessage, { role: 'model', text: '' }]);
        const currentHistory = [...chatHistory, userMessage]; // History for the API doesn't include the empty model bubble

        setPrompt('');
        setIsLoading(true);

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: currentHistory }),
            });

            if (!response.ok || !response.body) {
                const errorText = await response.text();
                throw new Error(response.statusText || errorText || 'API request failed');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedText = '';
            
            // Simplified stream reading: just accumulate the text
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                accumulatedText += decoder.decode(value, { stream: true });
            }
            accumulatedText += decoder.decode(); // Final flush

            // Parse the complete JSON response only once at the end
            const finalJson = JSON.parse(accumulatedText);
            const responseMessage = finalJson.message || "Here are the files I've generated for you.";

            // Update the last message (the empty "thinking" bubble) with the final response
            setChatHistory((prev: ChatMessage[]) => {
                const newHistory = [...prev];
                if (newHistory.length > 0 && newHistory[newHistory.length - 1].role === 'model') {
                    newHistory[newHistory.length - 1].text = responseMessage;
                }
                return newHistory;
            });

            if (finalJson.files && finalJson.files.length > 0) {
                const newFiles = finalJson.files;
                setFiles(newFiles);
                if (!activeFileName || !newFiles.some(f => f.name === activeFileName)) {
                    const preferredFiles = ['src/App.tsx', 'src/main.tsx', 'index.html'];
                    let newActiveFile = newFiles[0]?.name;
                    for (const preferred of preferredFiles) {
                        const found = newFiles.find(f => f.name === preferred);
                        if (found) {
                            newActiveFile = found.name;
                            break;
                        }
                    }
                    setActiveFileName(newActiveFile);
                }
            }

        } catch (error) {
            console.error('API Error:', error);
            const errorMessage = `Sorry, there was an error. ${error instanceof Error ? error.message : ''}`;
            // Update the "thinking" bubble with an error message
            setChatHistory((prev: ChatMessage[]) => {
                const newHistory = [...prev];
                 if (newHistory.length > 0 && newHistory[newHistory.length - 1].role === 'model') {
                    newHistory[newHistory.length - 1].text = errorMessage;
                }
                return newHistory;
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const clearSession = () => {
        clearFiles();
        clearChatHistory();
        clearActiveFile();
        setChatHistory(initialChat); // Reset to initial welcome message
        // Force a reload to clear the WebContainer instance
        window.location.reload();
        console.log('Session cleared.');
    };

    const updateFileContent = useCallback((fileName: string, newContent: string) => {
        setFiles(prevFiles =>
            prevFiles.map(file =>
                file.name === fileName ? { ...file, content: newContent } : file
            )
        );
    }, [setFiles]);

    const activeFile = useMemo(() => files.find(f => f.name === activeFileName), [files, activeFileName]);

    return {
        files,
        activeFileName,
        setActiveFileName,
        prompt,
        setPrompt,
        chatHistory,
        isLoading,
        isApiConfigured,
        handlePromptSubmit,
        activeFile,
        clearSession,
        updateFileContent,
    };
};