import React, { useState, useEffect, useRef } from 'react';
import { SendIcon, HTMLFileIcon, TSXFileIcon, CSSFileIcon, FileIcon } from './icons.tsx';

type AppFile = {
    name: string;
    content: string;
};

type ChatMessage = {
    role: 'user' | 'model';
    text: string;
    rawJson?: string;
};

const IDE = () => {
    const [files, setFiles] = useState<AppFile[]>([]);
    const [activeFileName, setActiveFileName] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const chatEndRef = useRef<HTMLDivElement>(null);
    const blobUrlsRef = useRef<string[]>([]);

    useEffect(() => {
        setChatHistory([{ role: 'model', text: 'Hello! I am MominAI. Describe the application you want to build, and I will generate the full codebase for you.' }]);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);
    
    // Cleanup blob URLs on unmount
    useEffect(() => {
        return () => {
            blobUrlsRef.current.forEach(URL.revokeObjectURL);
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const getFileIcon = (fileName: string) => {
        if (fileName.endsWith('.html')) return <HTMLFileIcon />;
        if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) return <TSXFileIcon />;
        if (fileName.endsWith('.css')) return <CSSFileIcon />;
        return <FileIcon />;
    };

    const updatePreview = (generatedFiles: AppFile[]) => {
        // Clean up previous blob URLs
        blobUrlsRef.current.forEach(URL.revokeObjectURL);
        blobUrlsRef.current = [];

        const fileBlobs = new Map<string, string>();
        
        generatedFiles.forEach(file => {
            if (!file.name.endsWith('.html')) {
                const extension = file.name.split('.').pop();
                let mimeType = 'text/plain';
                if (['js', 'jsx', 'ts', 'tsx'].includes(extension)) mimeType = 'application/javascript';
                else if (extension === 'css') mimeType = 'text/css';
                
                const blob = new Blob([file.content], { type: mimeType });
                const url = URL.createObjectURL(blob);
                fileBlobs.set(`/${file.name}`, url);
                blobUrlsRef.current.push(url);
            }
        });

        const htmlFile = generatedFiles.find(f => f.name.toLowerCase() === 'index.html');
        if (!htmlFile) {
            console.error('index.html not found in generated files.');
            return;
        }

        let processedHtml = htmlFile.content;
        processedHtml = processedHtml.replace(/(src|href)=["'](.\/|\/)([^"']+)["']/g, (match, attr, prefix, path) => {
            const fullPath = `/${path}`;
            if (fileBlobs.has(fullPath)) {
                return `${attr}="${fileBlobs.get(fullPath)}"`;
            }
            return match;
        });
        
        const finalBlob = new Blob([processedHtml], { type: 'text/html' });
        const url = URL.createObjectURL(finalBlob);
        
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(url);
    };

    const handlePromptSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setChatHistory(prev => [...prev, { role: 'user', text: prompt }]);
        const currentPrompt = prompt;
        setPrompt('');

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: currentPrompt }),
            });

            if (!response.ok || !response.body) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedResponse = '';
            setChatHistory(prev => [...prev, { role: 'model', text: '' }]);

            while(true) {
                const { done, value } = await reader.read();
                if (done) break;
                accumulatedResponse += decoder.decode(value, { stream: true });
            }

            const jsonString = accumulatedResponse.replace(/^```json|```$/g, '').trim();
            const parsed = JSON.parse(jsonString);
            
            if (parsed.thoughts && parsed.files && Array.isArray(parsed.files)) {
                setChatHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1] = { role: 'model', text: parsed.thoughts, rawJson: accumulatedResponse };
                    return newHistory;
                });
                
                const newFiles = parsed.files.filter(f => f.name && f.content);
                setFiles(newFiles);
                const mainFile = newFiles.find(f => f.name.includes('App.tsx') || f.name.includes('index.tsx')) || newFiles.find(f => f.name.endsWith('.html')) || newFiles[0];
                setActiveFileName(mainFile?.name || null);
                updatePreview(newFiles);
            } else {
                throw new Error("Invalid JSON structure from AI. The response must contain 'thoughts' and 'files'.");
            }

        } catch (error) {
            console.error("Error generating content:", error);
            setChatHistory(prev => {
                const newHistory = [...prev];
                const lastMsg = newHistory[newHistory.length - 1];
                if(lastMsg.role === 'model' && lastMsg.text === '') {
                     lastMsg.text = `Sorry, an error occurred: ${error.message}`;
                } else {
                    newHistory.push({ role: 'model', text: `Sorry, an error occurred: ${error.message}` });
                }
                return newHistory;
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const activeFile = files.find(f => f.name === activeFileName);

    const styles: { [key: string]: React.CSSProperties } = {
        ide: { display: 'flex', width: '100%', height: '100%', flexDirection: 'column', backgroundColor: 'rgba(17, 16, 24, 0.7)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-color)', borderRadius: '1rem', boxShadow: '0 10px 50px rgba(0,0,0,0.5)', overflow: 'hidden' },
        header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', flexShrink: 0, userSelect: 'none' },
        windowControls: { display: 'flex', gap: '0.5rem' },
        controlDot: { width: '12px', height: '12px', borderRadius: '50%' },
        headerTitle: { color: 'var(--gray)', fontWeight: 500 },
        main: { display: 'flex', flex: 1, overflow: 'hidden' },
        panel: { height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
        leftPanel: { width: '30%', minWidth: '300px', borderRight: '1px solid var(--border-color)' },
        middlePanel: { width: '40%', minWidth: '400px', borderRight: '1px solid var(--border-color)' },
        rightPanel: { width: '30%', minWidth: '300px' },
        chatMessages: { flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
        message: { maxWidth: '95%', padding: '0.75rem 1rem', borderRadius: '0.75rem', lineHeight: 1.5, wordWrap: 'break-word' },
        userMessage: { backgroundColor: 'var(--accent)', color: 'white', alignSelf: 'flex-end', borderBottomRightRadius: '0.125rem' },
        modelMessage: { backgroundColor: 'var(--background-tertiary)', alignSelf: 'flex-start', borderBottomLeftRadius: '0.125rem' },
        chatForm: { display: 'flex', padding: '1rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--background-secondary)' },
        chatInput: { flex: 1, backgroundColor: 'var(--background-tertiary)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.75rem', color: 'var(--foreground)', fontSize: '1rem', resize: 'none', marginRight: '0.5rem', fontFamily: 'var(--font-sans)' },
        chatButton: { backgroundColor: 'var(--accent)', border: 'none', borderRadius: '0.5rem', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        panelHeader: { padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', userSelect: 'none', color: 'var(--gray)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' },
        fileExplorer: { padding: '0.5rem', flex: '0 1 40%', overflowY: 'auto' },
        fileItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer', userSelect: 'none', fontSize: '0.9rem' },
        editorContainer: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
        codeEditor: { flex: 1, padding: '1rem', overflow: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#d4d4d4', backgroundColor: '#1E1E1E', whiteSpace: 'pre-wrap', wordBreak: 'break-all' },
        iframe: { width: '100%', height: '100%', border: 'none', backgroundColor: 'white' },
        statusBar: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--gray)', userSelect: 'none' },
    };

    return (
        <div style={styles.ide}>
            <header style={styles.header}>
                <div style={styles.windowControls}>
                    <div style={{...styles.controlDot, backgroundColor: '#FF5F56'}}></div>
                    <div style={{...styles.controlDot, backgroundColor: '#FFBD2E'}}></div>
                    <div style={{...styles.controlDot, backgroundColor: '#27C93F'}}></div>
                </div>
                <div style={styles.headerTitle}>MominAI Assistant</div>
                <div style={{width: '58px'}}></div>
            </header>

            <main style={styles.main}>
                <div style={{...styles.panel, ...styles.leftPanel}}>
                    <div style={styles.panelHeader}>AI Assistant</div>
                    <div style={styles.chatMessages}>
                        {chatHistory.map((msg, i) => (
                            <div key={i} style={{...styles.message, ...(msg.role === 'user' ? styles.userMessage : styles.modelMessage)}}>
                                {msg.text}
                                {isLoading && msg.role === 'model' && msg.text === '' && i === chatHistory.length - 1 && <span className="blinking-cursor"></span>}
                                {msg.rawJson && (
                                    <details style={{marginTop: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '0.25rem'}}>
                                        <summary style={{cursor: 'pointer', fontSize: '0.8rem', color: 'var(--gray)'}}>View Raw Output</summary>
                                        <pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.75rem', marginTop: '0.5rem', maxHeight: '150px', overflow: 'auto' }}>
                                            <code>{JSON.stringify(JSON.parse(msg.rawJson), null, 2)}</code>
                                        </pre>
                                    </details>
                                )}
                            </div>
                        ))}
                         <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handlePromptSubmit} style={styles.chatForm}>
                        <textarea 
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handlePromptSubmit(e); } }}
                            style={styles.chatInput}
                            placeholder="e.g., a SaaS landing page..."
                            rows={1}
                            disabled={isLoading}
                        />
                        <button type="submit" style={styles.chatButton} disabled={isLoading}><SendIcon /></button>
                    </form>
                </div>
                
                <div style={{...styles.panel, ...styles.middlePanel}}>
                    <div style={styles.panelHeader}>Explorer</div>
                    <div style={styles.fileExplorer}>
                        {files.length > 0 ? files.map(file => (
                            <div 
                                key={file.name} 
                                style={{
                                    ...styles.fileItem, 
                                    backgroundColor: activeFileName === file.name ? 'var(--accent)' : 'transparent',
                                    color: activeFileName === file.name ? 'white' : 'var(--foreground)',
                                }}
                                onClick={() => setActiveFileName(file.name)}
                            >
                                {getFileIcon(file.name)}
                                <span>{file.name.replace('src/', '')}</span>
                            </div>
                        )) : <p style={{color: 'var(--gray)', fontSize: '0.9rem', padding: '0.5rem'}}>No files generated yet.</p>}
                    </div>
                     <div style={{...styles.panelHeader, borderTop: '1px solid var(--border-color)'}}>{activeFileName || 'Editor'}</div>
                    <div style={styles.editorContainer}>
                       <pre style={{margin: 0, height: '100%', overflow: 'hidden'}}><code style={styles.codeEditor}>
                           {activeFile ? activeFile.content : 'Select a file to view its content.'}
                       </code></pre>
                    </div>
                </div>

                <div style={{...styles.panel, ...styles.rightPanel}}>
                    <div style={styles.panelHeader}>Live Preview</div>
                    {previewUrl ? 
                        <iframe style={styles.iframe} src={previewUrl} title="Live Preview" sandbox="allow-scripts" /> :
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--gray)', padding: '1rem', textAlign: 'center'}}>
                            The application preview will appear here once generated.
                        </div>
                    }
                </div>
            </main>

            <footer style={styles.statusBar}>
                <span>main*</span>
                <span>UTF-8</span>
                <span>Spaces: 2</span>
            </footer>

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
                textarea::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
};

export default IDE;
