import React, { useState, useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useIDEState } from './hooks/useIDEState';

import Header from './Header';
import ChatPanel from './ChatPanel';
import FileExplorer from './FileExplorer';
import CodeEditor from './CodeEditor';
import Terminal from './Terminal';
import PreviewPanel from './PreviewPanel';

interface IDEProps {
    onLogout: () => void;
}

const IDE = ({ onLogout }: IDEProps) => {
    const {
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
    } = useIDEState();
    
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 900);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="ide-wrapper">
            <div className="ide-container">
                <Header onLogout={onLogout} onClearSession={clearSession} />
                <main className="ide-main">
                    <PanelGroup direction={isMobile ? "vertical" : "horizontal"}>
                        {/* Chat Panel */}
                        <Panel defaultSize={20} minSize={15}>
                            <ChatPanel 
                                chatHistory={chatHistory}
                                prompt={prompt}
                                onPromptChange={setPrompt}
                                onSubmit={handlePromptSubmit}
                                isLoading={isLoading}
                                isApiConfigured={isApiConfigured}
                            />
                        </Panel>

                        <PanelResizeHandle className="resize-handle" />

                        {/* Code & Terminal Panel */}
                        <Panel defaultSize={50} minSize={20}>
                           <PanelGroup direction="vertical">
                                <Panel defaultSize={70} minSize={20}>
                                    <div className="code-panel">
                                        <FileExplorer 
                                            files={files}
                                            activeFileName={activeFileName}
                                            onFileSelect={setActiveFileName}
                                        />
                                        <CodeEditor 
                                            activeFile={activeFile} 
                                            onContentChange={(newContent) => {
                                                if (activeFile) {
                                                    updateFileContent(activeFile.name, newContent);
                                                }
                                            }}
                                        />
                                    </div>
                                </Panel>
                                <PanelResizeHandle className="resize-handle" />
                                <Panel defaultSize={30} minSize={10}>
                                   <Terminal />
                                </Panel>
                           </PanelGroup>
                        </Panel>

                        <PanelResizeHandle className="resize-handle" />

                        {/* Preview Panel */}
                        <Panel defaultSize={30} minSize={15}>
                            <PreviewPanel files={files} />
                        </Panel>
                    </PanelGroup>
                </main>
            </div>
            <style>{`
                * { box-sizing: border-box; }
                .ide-wrapper { padding: 2rem; height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; }
                .ide-container { display: flex; flex-direction: column; height: 100%; width: 100%; background: rgba(17, 17, 19, 0.7); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); color: #e4e4e7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; overflow: hidden; border-radius: 1.5rem; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); }
                .ide-header { display: flex; align-items: center; justify-content: space-between; padding: 0 24px; height: 60px; background: rgba(10, 10, 12, 0.5); border-bottom: 1px solid rgba(255, 255, 255, 0.1); flex-shrink: 0; }
                .header-right { display: flex; align-items: center; gap: 12px; }
                .header-btn { background: rgba(39, 39, 42, 0.8); border: 1px solid #3f3f46; display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; color: #e4e4e7; font-size: 14px; cursor: pointer; transition: all 0.2s ease; }
                .header-btn:hover { background: #3f3f46; border-color: #52525b; }
                .clear-btn:hover { background: #562222; border-color: #773333; }
                .ide-main { flex: 1; overflow: hidden; display: flex; }
                .chat-panel, .code-panel, .preview-panel, .terminal-container { display: flex; flex-direction: column; height: 100%; width: 100%; background: transparent; }
                .code-panel { flex-direction: row; }
                .panel-title-container, .preview-header, .editor-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); background: rgba(10, 10, 12, 0.5); flex-shrink: 0; }
                .panel-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; color: #e4e4e7; }
                .refresh-btn { padding: 6px; background: none; border: 1px solid #3f3f46; border-radius: 6px; color: #a1a1aa; cursor: pointer; transition: all 0.2s ease; }
                .refresh-btn:hover { background: #27272a; color: #e4e4e7; }
                .chat-messages { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
                .message { display: flex; align-items: flex-start; }
                .user-message { justify-content: flex-end; }
                .assistant-message { justify-content: flex-start; }
                .message-content { max-width: 95%; padding: 12px 16px; border-radius: 12px; line-height: 1.5; font-size: 14px; white-space: pre-wrap; word-wrap: break-word; }
                .user-message .message-content { background: #2563eb; color: white; border-bottom-right-radius: 4px; }
                .assistant-message .message-content { background: rgba(39, 39, 42, 0.8); color: #e4e4e7; border-bottom-left-radius: 4px; }
                .typing-indicator { display: inline-block; width: 8px; height: 16px; background: #a1a1aa; margin-left: 4px; animation: blink 1s infinite; border-radius: 1px; }
                @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
                .chat-input-form { padding: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1); background: rgba(10, 10, 12, 0.5); }
                .input-container { display: flex; align-items: flex-end; gap: 12px; padding: 12px; background: #27272a; border: 1px solid #3f3f46; border-radius: 12px; transition: all 0.2s ease; }
                .input-container:focus-within { border-color: #2563eb; background: #1e1e20; }
                .chat-input { flex: 1; background: none; border: none; color: #e4e4e7; font-size: 14px; resize: none; outline: none; min-height: 20px; max-height: 120px; font-family: inherit; }
                .chat-input::placeholder { color: #71717a; }
                .send-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: #2563eb; border: none; border-radius: 8px; color: white; cursor: pointer; transition: all 0.2s ease; flex-shrink: 0; }
                .send-btn:hover:not(:disabled) { background: #1d4ed8; transform: translateY(-1px); }
                .send-btn:disabled { background: #3f3f46; color: #71717a; cursor: not-allowed; transform: none; }
                .file-explorer { width: 240px; min-width: 200px; max-width: 400px; border-right: 1px solid rgba(255, 255, 255, 0.1); background: rgba(10, 10, 12, 0.5); display: flex; flex-direction: column; }
                .file-tree { padding: 8px; flex: 1; overflow-y: auto; }
                .file-item { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; font-size: 14px; }
                .file-item:hover { background: rgba(39, 39, 42, 0.8); }
                .file-item.active { background: #1e40af; color: white; }
                .file-icon { flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 16px; height: 16px; }
                .file-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .code-editor-container { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
                .editor-tab { display: flex; align-items: center; gap: 8px; padding: 6px 12px; background: rgba(39, 39, 42, 0.8); border-radius: 6px; font-size: 12px; color: #e4e4e7; }
                .editor-empty, .preview-empty { flex: 1; display: flex; align-items: center; justify-content: center; }
                .preview-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #111111; border-bottom-right-radius: 1.5rem; }
                .preview-frame { flex: 1; width: 100%; border: none; background: white; border-bottom-right-radius: 1.5rem; }
                .empty-state { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; color: #71717a; padding: 1rem; }
                .empty-state svg { opacity: 0.5; }
                .empty-state p { margin: 0; font-size: 16px; font-weight: 500; color: #a1a1aa; }
                .empty-state span { font-size: 14px; color: #71717a; }
                .resize-handle { background-color: rgba(255, 255, 255, 0.1); transition: background-color 0.2s ease; }
                .resize-handle[data-dragging] { background-color: var(--accent); }
                [data-panel-group-direction="horizontal"] > .resize-handle { width: 3px; }
                [data-panel-group-direction="vertical"] > .resize-handle { height: 3px; }
                .terminal-container { background: rgba(10, 10, 12, 0.5); border-top: 1px solid rgba(255, 255, 255, 0.1); }
                .terminal-header { padding: 8px 12px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
                .terminal-dots { display: flex; gap: 6px; }
                .terminal-dots .dot { width: 12px; height: 12px; border-radius: 50%; }
                .terminal-dots .red { background: #ff5f56; }
                .terminal-dots .yellow { background: #ffbd2e; }
                .terminal-dots .green { background: #27c93f; }
                .terminal-title { color: #a1a1aa; font-size: 12px; }
                .terminal-body { padding: 12px; font-family: monospace; font-size: 14px; }
                .terminal-body p { margin: 0; display: flex; align-items: center; }
                .terminal-body span { display: inline-block; width: 8px; height: 16px; background: var(--foreground); margin-left: 8px; animation: blink 1s infinite; }
                ::-webkit-scrollbar { width: 8px; height: 8px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #52525b; }
                @media (max-width: 900px) {
                   .ide-wrapper { padding: 1rem; }
                   .code-panel { border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
                   .file-explorer { width: 100%; border-right: none; }
                   .code-editor-container { display: none; }
                }
            `}</style>
        </div>
    );
};

export default IDE;