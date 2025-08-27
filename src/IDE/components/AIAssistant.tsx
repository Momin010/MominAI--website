
import React, { useState, useRef, useEffect } from 'react';
import { useAI } from '../contexts/AIContext';
import type { Message } from '../types';
import { Icons } from './Icon';

declare const marked: any;

const AIAssistant: React.FC = () => {
  const { messages, sendMessage, isLoading } = useAI();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async () => {
    const prompt = input;
    if (prompt.trim() === '' || isLoading) return;
    setInput('');
    await sendMessage(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (msg: Message) => {
      if (typeof marked === 'undefined') {
          return <p className="text-sm whitespace-pre-wrap">{msg.text}</p>;
      }
      const rawHtml = marked.parse(msg.text);
      return (
        <div className="prose prose-sm prose-invert max-w-none prose-p:my-2 prose-pre:my-2 prose-pre:bg-black/20 prose-pre:p-2 prose-pre:rounded-md">
            <span dangerouslySetInnerHTML={{ __html: rawHtml }} />
            {msg.isStreaming && <span className="inline-block w-2 h-4 bg-white/70 ml-1 animate-pulse" />}
        </div>
      );
  };

  return (
    <div className="text-gray-200 h-full flex flex-col bg-transparent">
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-[var(--accent)]/50 flex items-center justify-center flex-shrink-0"><Icons.Bot className="w-5 h-5"/></div>}
            <div className={`rounded-lg p-3 max-w-xs md:max-w-md lg:max-w-lg shadow-md animate-fade-in-up ${msg.sender === 'user' ? 'bg-[var(--accent)]/80 text-white' : 'bg-[var(--gray-dark)]/50 text-gray-200'}`}>
              {renderMessage(msg)}
            </div>
          </div>
        ))}
        {isLoading && (!messages[messages.length-1]?.isStreaming) && (
          <div className="flex justify-start">
            <div className="bg-[var(--gray-dark)]/50 text-gray-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 border-t border-[var(--border-color)] flex-shrink-0">
        <div className="flex items-center bg-[var(--gray-dark)]/50 rounded-lg p-1 border border-transparent focus-within:border-[var(--accent)] transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI to edit files or answer questions..."
            className="flex-grow bg-transparent border-none outline-none text-white text-sm resize-none p-2 w-full"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || input.trim() === ''}
            className="bg-[var(--accent)] text-white p-2 rounded-md disabled:bg-[var(--gray)] disabled:cursor-not-allowed hover:brightness-125 transition-all"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
