
import React, { useState, useEffect, useRef } from 'react';
import { useAI } from '../contexts/AIContext.tsx';
import { useWebContainer } from '../WebContainerProvider.tsx';
import { MominAILogo } from '../../components/icons.tsx';
import { Icons } from './Icon.tsx';
import type { Message } from '../types.ts';

const StatusIndicator: React.FC<{ status: string }> = ({ status }) => {
    const messages: Record<string, string> = {
        thinking: "AI is thinking...",
        building: "Building your app...",
        ready: "Preview is ready!",
        idle: "Waiting for your prompt..."
    };

    return (
        <div className="flex items-center justify-center gap-2 p-2 bg-black/20 rounded-lg text-sm text-gray-300">
            {status === 'thinking' && <div className="w-3 h-3 border-2 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>}
            {status === 'building' && <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>}
            {status === 'ready' && <div className="w-3 h-3 bg-green-400 rounded-full"></div>}
            <span>{messages[status]}</span>
        </div>
    );
};

const MobileIDEView: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const { serverUrl, isLoading: isWcLoading } = useWebContainer();
    const { messages, isLoading: isAiLoading, sendMessage } = useAI();
    const [input, setInput] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [status, setStatus] = useState('idle');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isWcLoading) {
            setStatus('building');
        } else if (isAiLoading) {
            setStatus('thinking');
        } else if (messages.length > 1 && !serverUrl) {
            setStatus('building');
        } else if (serverUrl) {
            setStatus('ready');
        } else {
            setStatus('idle');
        }
    }, [isWcLoading, isAiLoading, serverUrl, messages]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (input.trim() && !isAiLoading) {
            sendMessage(input);
            setInput('');
        }
    };

    if (showPreview && serverUrl) {
        return (
            <div className="h-full w-full flex flex-col bg-black">
                <iframe src={serverUrl} className="flex-grow w-full h-full border-none" title="Live Preview" />
                <button 
                    onClick={() => setShowPreview(false)} 
                    className="flex-shrink-0 w-full p-4 bg-gray-800 text-white font-semibold text-center border-none"
                >
                    Back to Chat
                </button>
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col bg-[#020c1b] text-white">
            <header className="flex-shrink-0 flex items-center justify-between p-4 bg-[var(--background-secondary)]/50 border-b border-[var(--border-color)]">
                <MominAILogo width={100} height={24} />
                <StatusIndicator status={status} />
                <button onClick={onLogout} title="Logout" className="text-gray-400 hover:text-white p-1 bg-transparent border-none">
                    <Icons.LogOut className="w-5 h-5"/>
                </button>
            </header>

            <main className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-cyan-500/50 flex items-center justify-center flex-shrink-0"><Icons.Bot className="w-5 h-5"/></div>}
                    <div className={`rounded-lg p-3 max-w-xs shadow-md animate-fade-in-up ${msg.sender === 'user' ? 'bg-cyan-600/80' : 'bg-gray-800/50'}`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        {msg.isStreaming && <span className="inline-block w-2 h-4 bg-white/70 ml-1 animate-pulse" />}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
            </main>

            <footer className="flex-shrink-0 p-2 border-t border-[var(--border-color)]">
                 {status === 'ready' && (
                    <button 
                        onClick={() => setShowPreview(true)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-lg mb-2 border-none animate-pulse"
                    >
                        Go to Preview
                    </button>
                 )}
                 <div className="flex items-center bg-gray-800/50 rounded-lg p-1">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Build me an app..."
                        className="flex-grow bg-transparent border-none outline-none text-white text-sm p-2 w-full"
                        disabled={isAiLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isAiLoading || !input.trim()}
                        className="bg-cyan-500 text-white p-2 rounded-md disabled:bg-gray-600 border-none"
                    >
                        <Icons.Send className="w-4 h-4"/>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default MobileIDEView;
