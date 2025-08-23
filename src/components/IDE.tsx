import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MominAILogo, SendIcon, HTMLFileIcon, TSXFileIcon, CSSFileIcon, FileIcon } from './icons.tsx';

// A simple in-memory representation of the generated files
type AppFile = {
    name: string;
    content: string;
};

const IDE = () => {
    const [files, setFiles] = useState<AppFile[]>([]);
    const [activeFileName, setActiveFileName] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', text: string }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const chatEndRef = useRef<HTMLDivElement>(null);
    
    // Initialize Gemini AI
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = `You are an expert web developer specializing in creating single-page React applications. The user will provide a prompt describing an application. Your task is to generate all the necessary files for a complete, self-contained, and runnable web application using React and standard web technologies (HTML, CSS, TSX). 

You MUST respond with ONLY a single JSON object. The JSON object should have a single key, 'files', which is an array of objects. Each object in the array represents a file and must have two keys: 'name' (a string with the full file path, e.g., 'index.html', 'src/index.tsx') and 'content' (a string containing the full source code for that file).

The generated application should not require any external server or build process to run; it must be runnable directly in the browser using ES modules via an import map pointing to a CDN like esm.sh. Ensure you provide a complete index.html, a root TSX file (e.g., src/index.tsx), and all necessary components. Do not include any text, markdown formatting, or explanations in your response other than the single JSON object.`;

    useEffect(() => {
        setChatHistory([{ role: 'model', text: 'Hello! Describe the application you want to build.' }]);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const getFileIcon = (fileName: string) => {
        if (fileName.endsWith('.html')) return <HTMLFileIcon />;
        if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) return <TSXFileIcon />;
        if (fileName.endsWith('.css')) return <CSSFileIcon />;
        return <FileIcon />;
    };

    const updatePreview = (generatedFiles: AppFile[]) => {
        const htmlFile = generatedFiles.find(f => f.name === 'index.html');
        if (!htmlFile) {
            console.error('index.html not found in generated files.');
            return;
        }
        
        const blob = new Blob([htmlFile.content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Clean up previous blob URL
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        
        setPreviewUrl(url);
    };

    const handlePromptSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt || isLoading) return;

        setIsLoading(true);
        setChatHistory(prev => [...prev, { role: 'user', text: prompt }]);
        setPrompt('');

        try {
            const responseStream = await ai.models.generateContentStream({
                model: "gemini-2.5-flash",
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                config: {
                    systemInstruction,
                },
            });
            
            let accumulatedResponse = '';
            setChatHistory(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of responseStream) {
                accumulatedResponse += chunk.text;
                // Update the last message in chat history with the streaming text
                setChatHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1].text = accumulatedResponse;
                    return newHistory;
                });
            }

            // Clean up the response and parse JSON
            const jsonString = accumulatedResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(jsonString);
            
            if (parsed.files && Array.isArray(parsed.files)) {
                setFiles(parsed.files);
                setActiveFileName(parsed.files.find(f => f.name.endsWith('.tsx'))?.name || parsed.files[0]?.name || null);
                updatePreview(parsed.files);
            } else {
                throw new Error("Invalid JSON structure from API.");
            }

        } catch (error) {
            console.error("Error generating content:", error);
            setChatHistory(prev => [...prev, { role: 'model', text: `Sorry, something went wrong: ${error.message}` }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const activeFile = files.find(f => f.name === activeFileName);

    const styles: { [key: string]: React.CSSProperties } = {
        ide: { display: 'flex', height: '100vh', flexDirection: 'column', backgroundColor: '#0A0A0A' },
        header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-color)', flexShrink: 0 },
        main: { display: 'flex', flex: 1, overflow: 'hidden' },
        panel: { height: '100%', overflow: 'auto', borderRight: '1px solid var(--border-color)' },
        chatPanel: { width: '25%', display: 'flex', flexDirection: 'column' },
        codePanel: { width: '40%', display: 'flex', flexDirection: 'column' },
        previewPanel: { width: '35%', borderRight: 'none' },
        chatMessages: { flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
        message: { maxWidth: '90%', padding: '0.5rem 1rem', borderRadius: '0.75rem', lineHeight: 1.5 },
        userMessage: { backgroundColor: 'var(--accent)', color: 'white', alignSelf: 'flex-end', borderBottomRightRadius: '0.125rem' },
        modelMessage: { backgroundColor: 'var(--gray-dark)', alignSelf: 'flex-start', borderBottomLeftRadius: '0.125rem' },
        chatForm: { display: 'flex', padding: '1rem', borderTop: '1px solid var(--border-color)' },
        chatInput: { flex: 1, backgroundColor: 'var(--background-secondary)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.75rem', color: 'white', fontSize: '1rem', resize: 'none', marginRight: '0.5rem' },
        chatButton: { backgroundColor: 'var(--accent)', border: 'none', borderRadius: '0.5rem', padding: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        fileExplorer: { padding: '1rem', borderBottom: '1px solid var(--border-color)' },
        fileItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: '0.25rem', cursor: 'pointer', userSelect: 'none' },
        codeEditor: { flex: 1, padding: '1rem', whiteSpace: 'pre-wrap', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.9rem', color: '#d4d4d4', backgroundColor: '#1e1e1e' },
        iframe: { width: '100%', height: '100%', border: 'none', backgroundColor: 'white' },
    };

    return (
        <div style={styles.ide}>
            <header style={styles.header}>
                <MominAILogo width={100} height={22} />
                <button style={{...styles.chatButton, backgroundColor: 'var(--gray-dark)'}}>Logout</button>
            </header>
            <main style={styles.main}>
                <div style={{...styles.panel, ...styles.chatPanel}}>
                    <div style={styles.chatMessages}>
                        {chatHistory.map((msg, i) => (
                            <div key={i} style={{...styles.message, ...(msg.role === 'user' ? styles.userMessage : styles.modelMessage)}}>
                                {msg.text}
                                {isLoading && i === chatHistory.length -1 && <span className="blinking-cursor"></span>}
                            </div>
                        ))}
                         <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handlePromptSubmit} style={styles.chatForm}>
                        <textarea 
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handlePromptSubmit(e) }}
                            style={styles.chatInput}
                            placeholder="e.g., a landing page for a SaaS product..."
                            rows={2}
                            disabled={isLoading}
                        />
                        <button type="submit" style={styles.chatButton} disabled={isLoading}><SendIcon /></button>
                    </form>
                </div>
                <div style={{...styles.panel, ...styles.codePanel}}>
                    <div style={styles.fileExplorer}>
                        <h3 style={{marginBottom: '1rem'}}>Files</h3>
                        {files.length > 0 ? files.map(file => (
                            <div 
                                key={file.name} 
                                style={{
                                    ...styles.fileItem, 
                                    backgroundColor: activeFileName === file.name ? 'var(--accent)' : 'transparent'
                                }}
                                onClick={() => setActiveFileName(file.name)}
                            >
                                {getFileIcon(file.name)}
                                <span>{file.name}</span>
                            </div>
                        )) : <p style={{color: 'var(--gray)', fontSize: '0.9rem'}}>No files generated yet.</p>}
                    </div>
                    <pre style={{margin: 0, flex: 1, overflow: 'hidden'}}><code style={styles.codeEditor}>
                        {activeFile ? activeFile.content : 'Select a file to view its content.'}
                    </code></pre>
                </div>
                <div style={{...styles.panel, ...styles.previewPanel}}>
                    {previewUrl ? 
                        <iframe style={styles.iframe} src={previewUrl} title="Live Preview" sandbox="allow-scripts allow-same-origin" /> :
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--gray)'}}>
                            Preview will appear here.
                        </div>
                    }
                </div>
            </main>
            <style>{`
                .blinking-cursor {
                    display: inline-block;
                    width: 8px;
                    height: 1.2em;
                    background-color: #ccc;
                    animation: blink 1s step-end infinite;
                    margin-left: 4px;
                    vertical-align: text-bottom;
                }
                @keyframes blink {
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default IDE;
