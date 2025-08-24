import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './types.ts';
import { SendIcon } from '../icons.tsx';

interface ChatPanelProps {
    chatHistory: ChatMessage[];
    prompt: string;
    onPromptChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    isApiConfigured: boolean;
}

const ChatPanel = ({ chatHistory, prompt, onPromptChange, onSubmit, isLoading, isApiConfigured }: ChatPanelProps) => {
    const chatEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, isLoading]);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`;
        }
    }, [prompt]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isLoading && prompt.trim()) {
                onSubmit(e as any);
            }
        }
    };

    return (
        <div className="chat-panel">
            <div className="panel-title-container">
                <div className="panel-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Chat
                </div>
            </div>
            <div className="chat-messages">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                        <div className="message-content">
                            {msg.text}
                            {/* If this is the last message, it's from the model, it's empty, and we're loading, show the indicator. */}
                            {isLoading && msg.role === 'model' && msg.text === '' && index === chatHistory.length - 1 && (
                                <>
                                  <span className="typing-indicator" style={{ animationDelay: '0s' }}></span>
                                  <span className="typing-indicator" style={{ animationDelay: '0.2s' }}></span>
                                  <span className="typing-indicator" style={{ animationDelay: '0.4s' }}></span>
                                </>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <form className="chat-input-form" onSubmit={onSubmit}>
                <div className="input-container">
                    <textarea
                        ref={textareaRef}
                        className="chat-input"
                        placeholder={isApiConfigured ? "Describe what you want to build..." : "API key not configured."}
                        value={prompt}
                        onChange={(e) => onPromptChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        disabled={isLoading || !isApiConfigured}
                        aria-label="Chat input"
                    />
                    <button type="submit" className="send-btn" disabled={isLoading || !prompt.trim() || !isApiConfigured} aria-label="Send message">
                        <SendIcon />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatPanel;