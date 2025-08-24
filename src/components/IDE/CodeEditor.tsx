import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { AppFile } from './types.ts';
import { getFileIcon } from './utils.ts';

interface CodeEditorProps {
    activeFile: AppFile | undefined;
    onContentChange: (newContent: string) => void;
}

const getLanguageExtension = (fileName: string) => {
    const extension = fileName.split('.').pop() || '';
    switch(extension) {
        case 'tsx':
        case 'jsx':
        case 'js':
            return [javascript({ jsx: true, typescript: true })];
        case 'html':
            return [html()];
        case 'css':
            return [css()];
        case 'json':
            return [json()];
        default:
            return [];
    }
}

const CodeEditor = ({ activeFile, onContentChange }: CodeEditorProps) => {
    if (!activeFile) {
        return (
            <div className="code-editor-container">
                <div className="editor-empty">
                    <div className="empty-state">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                        <p>Select a file to view</p>
                        <span>Choose a file from the explorer</span>
                    </div>
                </div>
            </div>
        );
    }
    
    const Icon = getFileIcon(activeFile.name);

    return (
        <div className="code-editor-container">
            <div className="editor-header">
                <div className="editor-tab">
                    <div className="file-icon"><Icon /></div>
                    <span>{activeFile.name}</span>
                </div>
            </div>
            <CodeMirror
                value={activeFile.content}
                height="100%"
                style={{ 
                    flex: 1, 
                    overflow: 'auto', 
                    fontSize: '14px',
                    fontFamily: "'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace"
                }}
                extensions={getLanguageExtension(activeFile.name)}
                theme={oneDark}
                onChange={(value) => onContentChange(value)}
            />
        </div>
    );
};


export default CodeEditor;