import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MominAILogo, SendIcon, HTMLFileIcon, TSXFileIcon, CSSFileIcon, FileIcon } from './icons.tsx';

// A simple in-memory representation of the generated files
type AppFile = {
    name: string;
    content: string;
};

interface IDEProps {
    onLogout: () => void;
}

const IDE = ({ onLogout }: IDEProps) => {
    const [files, setFiles] = useState<AppFile[]>([]);
    const [activeFileName, setActiveFileName] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', text: string }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isApiConfigured, setIsApiConfigured] = useState<boolean>(true);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const chatEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Register the service worker for the multi-file preview
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('Service Worker registered with scope:', registration.scope))
                .catch(error => console.error('Service Worker registration failed:', error));
        }
    }, []);

    useEffect(() => {
        // A simple check. We can't truly know if the key is valid from the client-side,
        // but we can provide a default state and let the first API call determine the truth.
        const initialMessage = 'Hello! Describe the application you want to build.';
        setChatHistory([{ role: 'model', text: initialMessage }]);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);
    
    // Auto-resize the textarea based on its content
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [prompt]);

    const getFileIcon = (fileName: string) => {
        if (fileName.endsWith('.html')) return <HTMLFileIcon />;
        if (fileName.endsWith('.tsx')) return <TSXFileIcon />;
        if (fileName.endsWith('.jsx')) return <TSXFileIcon />;
        if (fileName.endsWith('.js')) return <TSXFileIcon />; // Using TSX icon for JS as well
        if (fileName.endsWith('.css')) return <CSSFileIcon />;
        return <FileIcon />;
    };

    const getLanguageForSyntaxHighlighter = (fileName: string) => {
        const extension = fileName.split('.').pop() || '';
        switch(extension) {
            case 'tsx': return 'tsx';
            case 'jsx': return 'jsx';
            case 'js': return 'javascript';
            case 'css': return 'css';
            case 'html': return 'html';
            case 'json': return 'json';
            default: return 'plaintext';
        }
    }

    const sendFilesToServiceWorker = (filesToUpdate: AppFile[]) => {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'UPDATE_FILES',
                files: filesToUpdate
            });
        }
    };

    const updatePreview = () => {
        // Force the iframe to reload by changing the src.
        // The service worker will intercept the request and serve the correct files.
        setPreviewUrl(`/preview.html?t=${Date.now()}`);
    };
    
    const handlePromptSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt || isLoading) return;

        setIsLoading(true);
        const currentPrompt = prompt;
        const historyForApi = [...chatHistory, { role: 'user' as const, text: currentPrompt }];
        setChatHistory(historyForApi);
        setPrompt('');

        try {
            // Add a placeholder for the model's response which will show the typing indicator
            setChatHistory(prev => [...prev, { role: 'model', text: '' }]);

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: historyForApi }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                if (errorText.includes("API Key not found")) {
                    setIsApiConfigured(false);
                    throw new Error("API Key is missing. Please ask the administrator to set the API_KEY environment variable in the deployment settings.");
                }
                throw new Error(errorText || `HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('Failed to get response reader');
            }
            
            const decoder = new TextDecoder();
            let accumulatedResponse = '';

            // Read the stream to completion
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                accumulatedResponse += decoder.decode(value, { stream: true });
            }
            
            // Once the full JSON is received, parse it
            const jsonString = accumulatedResponse.trim();
            const parsed = JSON.parse(jsonString);

            if (typeof parsed.message !== 'string') {
                throw new Error("Invalid response: 'message' field is missing or not a string.");
            }

            // Always update the chat with the received message
            setChatHistory(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1].text = parsed.message; // Update the placeholder
                return newHistory;
            });
            
            // If files were also generated, update the IDE state
            if (Array.isArray(parsed.files) && parsed.files.length > 0) {
                const newFiles = parsed.files as AppFile[];

                // Update files in the editor and refresh the preview
                setFiles(newFiles);
                setActiveFileName(newFiles.find(f => f.name.includes('index.tsx'))?.name || newFiles.find(f => f.name.includes('index.html'))?.name || newFiles[0]?.name || null);
                
                sendFilesToServiceWorker(newFiles);
                updatePreview();
            }


        } catch (error) {
            console.error("Error generating content:", error);
            const errorMessage = `Sorry, something went wrong. Details: ${error.message}`;
            setChatHistory(prev => {
                const newHistory = [...prev];
                // Update the placeholder message with the error
                if (newHistory.length > 0) {
                   newHistory[newHistory.length - 1].text = errorMessage;
                }
                return newHistory;
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const activeFile = files.find(f => f.name === activeFileName);
    const isChatDisabled = isLoading || !isApiConfigured;

    return (
        <div className="ide-container">
            <header className="ide-header">
                <div className="header-left">
                    <MominAILogo width={100} height={22} />
                </div>
                <div className="header-right">
                    <button onClick={onLogout} className="logout-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16,17 21,12 16,7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        Logout
                    </button>
                </div>
            </header>

            <main className="ide-main">
                {/* Chat Panel */}
                <div className="chat-panel">
                    <div className="chat-header">
                        <div className="panel-title">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                            Chat
                        </div>
                    </div>
                    <div className="chat-messages">
                        {chatHistory.map((msg, i) => (
                            <div key={i} className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                                <div className="message-content">
                                    {msg.text ? msg.text : null}
                                    {isLoading && i === chatHistory.length - 1 && <span className="typing-indicator"></span>}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handlePromptSubmit} className="chat-input-form">
                        <div className="input-container">
                            <textarea 
                                ref={textareaRef}
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handlePromptSubmit(e); }}}
                                className="chat-input"
                                placeholder={isChatDisabled ? "Chat is disabled. API Key may be missing." : "Describe the application you want to build..."}
                                rows={1}
                                disabled={isChatDisabled}
                            />
                            <button type="submit" className="send-btn" disabled={isChatDisabled || !prompt.trim()}>
                                <SendIcon />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Code Panel */}
                <div className="code-panel">
                    <div className="file-explorer">
                        <div className="panel-title-container">
                             <div className="panel-title">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                                </svg>
                                Files
                            </div>
                        </div>
                        <div className="file-tree">
                            {files.length > 0 ? files.map(file => (
                                <div 
                                    key={file.name} 
                                    className={`file-item ${activeFileName === file.name ? 'active' : ''}`}
                                    onClick={() => setActiveFileName(file.name)}
                                >
                                    <div className="file-icon">
                                        {getFileIcon(file.name)}
                                    </div>
                                    <span className="file-name">{file.name}</span>
                                </div>
                            )) : (
                                <div className="empty-state">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        <polyline points="14,2 14,8 20,8"/>
                                        <line x1="16" y1="13" x2="8" y2="13"/>
                                        <line x1="16" y1="17" x2="8" y2="17"/>
                                        <polyline points="10,9 9,9 8,9"/>
                                    </svg>
                                    <p>No files yet</p>
                                    <span>Start a conversation to generate code</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="code-editor-container">
                        {activeFile ? (
                            <>
                                <div className="editor-header">
                                    <div className="editor-tab">
                                        <div className="file-icon">
                                            {getFileIcon(activeFile.name)}
                                        </div>
                                        <span>{activeFile.name}</span>
                                    </div>
                                </div>
                                <SyntaxHighlighter
                                    language={getLanguageForSyntaxHighlighter(activeFile.name)}
                                    style={atomDark}
                                    customStyle={{
                                        margin: 0,
                                        padding: '20px',
                                        background: '#0d1117',
                                        flex: 1,
                                        overflow: 'auto',
                                        fontSize: '14px',
                                        lineHeight: '1.6',
                                    }}
                                    codeTagProps={{
                                        style: {
                                            fontFamily: "'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace",
                                        },
                                    }}
                                >
                                    {activeFile.content}
                                </SyntaxHighlighter>
                            </>
                        ) : (
                            <div className="editor-empty">
                                <div className="empty-state">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="m18 16 4-4-4-4"/>
                                        <path d="m6 8-4 4 4 4"/>
                                        <path d="m14.5 4-5 16"/>
                                    </svg>
                                    <p>Select a file to view</p>
                                    <span>Choose a file from the explorer to see its contents</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="preview-panel">
                    <div className="preview-header">
                        <div className="panel-title">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                <line x1="8" y1="21" x2="16" y2="21"/>
                                <line x1="12" y1="17" x2="12" y2="21"/>
                            </svg>
                            Preview
                        </div>
                        {previewUrl && (
                            <button className="refresh-btn" onClick={updatePreview}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="23 4 23 10 17 10"/>
                                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="preview-content">
                        {previewUrl ? (
                            <iframe 
                                key={previewUrl} // Using key to force re-render
                                src={previewUrl} 
                                title="Live Preview" 
                                sandbox="allow-scripts allow-same-origin" 
                                className="preview-frame"
                            />
                        ) : (
                            <div className="preview-empty">
                                <div className="empty-state">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                        <line x1="8" y1="21" x2="16" y2="21"/>
                                        <line x1="12" y1="17" x2="12" y2="21"/>
                                    </svg>
                                    <p>No preview available</p>
                                    <span>Generate some code to see the live preview</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <style>{`
                * {
                    box-sizing: border-box;
                }

                .ide-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    background: #0f0f11;
                    color: #e4e4e7;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                    overflow: hidden;
                }

                .ide-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 16px;
                    height: 60px;
                    background: #18181b;
                    border-bottom: 1px solid #27272a;
                    flex-shrink: 0;
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .logout-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: #27272a;
                    border: 1px solid #3f3f46;
                    border-radius: 8px;
                    color: #e4e4e7;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .logout-btn:hover {
                    background: #3f3f46;
                    border-color: #52525b;
                }

                .ide-main {
                    display: flex;
                    flex: 1;
                    overflow: hidden;
                }

                .chat-panel,
                .code-panel,
                .preview-panel {
                    display: flex;
                    flex-direction: column;
                    background: #18181b;
                    border-right: 1px solid #27272a;
                }

                .chat-panel {
                    width: 320px;
                    min-width: 280px;
                    max-width: 400px;
                    resize: horizontal;
                    overflow: auto;
                }

                .code-panel {
                    flex: 1;
                    min-width: 400px;
                    display: flex;
                    flex-direction: row;
                    overflow: hidden;
                }

                .preview-panel {
                    width: 400px;
                    min-width: 300px;
                    max-width: 600px;
                    border-right: none;
                    resize: horizontal;
                    overflow: auto;
                }

                .chat-header,
                .preview-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 16px;
                    border-bottom: 1px solid #27272a;
                    background: #0f0f11;
                    flex-shrink: 0;
                }

                .panel-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #e4e4e7;
                }
                
                .panel-title-container {
                     padding: 12px 16px;
                     border-bottom: 1px solid #27272a;
                     flex-shrink: 0;
                }

                .refresh-btn {
                    padding: 6px;
                    background: none;
                    border: 1px solid #3f3f46;
                    border-radius: 6px;
                    color: #a1a1aa;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .refresh-btn:hover {
                    background: #27272a;
                    color: #e4e4e7;
                }

                .chat-messages {
                    flex: 1;
                    padding: 16px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .message {
                    display: flex;
                    align-items: flex-start;
                }

                .user-message {
                    justify-content: flex-end;
                }

                .assistant-message {
                    justify-content: flex-start;
                }

                .message-content {
                    max-width: 95%;
                    padding: 12px 16px;
                    border-radius: 12px;
                    line-height: 1.5;
                    font-size: 14px;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }

                .user-message .message-content {
                    background: #2563eb;
                    color: white;
                    border-bottom-right-radius: 4px;
                }

                .assistant-message .message-content {
                    background: #27272a;
                    color: #e4e4e7;
                    border-bottom-left-radius: 4px;
                }

                .typing-indicator {
                    display: inline-block;
                    width: 8px;
                    height: 16px;
                    background: #a1a1aa;
                    margin-left: 4px;
                    animation: blink 1s infinite;
                    border-radius: 1px;
                }

                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }

                .chat-input-form {
                    padding: 16px;
                    border-top: 1px solid #27272a;
                    background: #0f0f11;
                }

                .input-container {
                    display: flex;
                    align-items: flex-end;
                    gap: 12px;
                    padding: 12px;
                    background: #27272a;
                    border: 1px solid #3f3f46;
                    border-radius: 12px;
                    transition: all 0.2s ease;
                }

                .input-container:focus-within {
                    border-color: #2563eb;
                    background: #1e1e20;
                }

                .chat-input {
                    flex: 1;
                    background: none;
                    border: none;
                    color: #e4e4e7;
                    font-size: 14px;
                    resize: none;
                    outline: none;
                    min-height: 20px;
                    max-height: 120px;
                    font-family: inherit;
                }

                .chat-input::placeholder {
                    color: #71717a;
                }

                .send-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    background: #2563eb;
                    border: none;
                    border-radius: 8px;
                    color: white;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }

                .send-btn:hover:not(:disabled) {
                    background: #1d4ed8;
                    transform: translateY(-1px);
                }

                .send-btn:disabled {
                    background: #3f3f46;
                    color: #71717a;
                    cursor: not-allowed;
                    transform: none;
                }

                .file-explorer {
                    width: 240px;
                    min-width: 200px;
                    max-width: 400px;
                    border-right: 1px solid #27272a;
                    background: #0f0f11;
                    resize: horizontal;
                    overflow: auto;
                    display: flex;
                    flex-direction: column;
                }

                .file-tree {
                    padding: 8px;
                    flex: 1;
                    overflow-y: auto;
                }

                .file-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 14px;
                }

                .file-item:hover {
                    background: #27272a;
                }

                .file-item.active {
                    background: #1e40af;
                    color: white;
                }

                .file-icon {
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 16px;
                    height: 16px;
                }

                .file-name {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .code-editor-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .editor-header {
                    display: flex;
                    align-items: center;
                    padding: 0 16px;
                    height: 40px;
                    background: #0f0f11;
                    border-bottom: 1px solid #27272a;
                    flex-shrink: 0;
                }

                .editor-tab {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 12px;
                    background: #27272a;
                    border-radius: 6px;
                    font-size: 12px;
                    color: #e4e4e7;
                }
                
                .editor-empty,
                .preview-empty {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .preview-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    background: white;
                }

                .preview-frame {
                    flex: 1;
                    width: 100%;
                    border: none;
                    background: white;
                }

                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    text-align: center;
                    color: #71717a;
                    padding: 1rem;
                }

                .empty-state svg {
                    opacity: 0.5;
                }

                .empty-state p {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 500;
                    color: #a1a1aa;
                }

                .empty-state span {
                    font-size: 14px;
                    color: #71717a;
                }

                /* Scrollbar Styling */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #18181b;
                }

                ::-webkit-scrollbar-thumb {
                    background: #3f3f46;
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: #52525b;
                }
                
                /* Handle for resizer */
                ::-webkit-resizer {
                    background-color: #3f3f46;
                    border-left: 1px solid #27272a;
                    border-right: 1px solid #27272a;
                }

                /* Responsive Design */
                @media (max-width: 1200px) {
                    .chat-panel {
                        width: 280px;
                    }
                    .preview-panel {
                        width: 350px;
                    }
                }

                @media (max-width: 900px) {
                    .ide-main {
                        flex-direction: column;
                    }
                    
                    .chat-panel,
                    .code-panel,
                    .preview-panel {
                        width: 100% !important;
                        height: 33.33vh;
                        border-right: none;
                        border-bottom: 1px solid #27272a;
                        resize: none;
                    }
                    
                    .preview-panel {
                        border-bottom: none;
                    }
                }

                @media (max-width: 640px) {
                    .ide-header {
                        padding: 0 12px;
                        height: 50px;
                    }
                    
                    .chat-messages,
                    .chat-input-form {
                        padding: 12px;
                    }
                    
                    .logout-btn {
                        padding: 6px 12px;
                        font-size: 13px;
                    }
                }
            `}</style>
        </div>
    );
};

export default IDE;