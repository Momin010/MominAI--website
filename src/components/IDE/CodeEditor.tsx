import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AppFile } from './types.ts';
import { getFileIcon, getLanguageForSyntaxHighlighter } from './utils.ts';

interface CodeEditorProps {
    activeFile: AppFile | undefined;
}

const CodeEditor = ({ activeFile }: CodeEditorProps) => (
    <div className="code-editor-container">
        {activeFile ? (
            <>
                <div className="editor-header">
                    <div className="editor-tab">
                        <div className="file-icon">{getFileIcon(activeFile.name)}</div>
                        <span>{activeFile.name}</span>
                    </div>
                </div>
                <SyntaxHighlighter 
                    language={getLanguageForSyntaxHighlighter(activeFile.name)} 
                    style={atomDark} 
                    customStyle={{ margin: 0, padding: '20px', background: 'transparent', flex: 1, overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }} 
                    codeTagProps={{ style: { fontFamily: "'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace" } }}
                >
                    {activeFile.content}
                </SyntaxHighlighter>
            </>
        ) : (
            <div className="editor-empty">
                <div className="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                    <p>Select a file to view</p>
                    <span>Choose a file from the explorer</span>
                </div>
            </div>
        )}
    </div>
);

export default CodeEditor;
