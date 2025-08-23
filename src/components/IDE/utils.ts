import React from 'react';
import { HTMLFileIcon, TSXFileIcon, CSSFileIcon, FileIcon } from '../icons.tsx';

export const getFileIcon = (fileName: string): React.FC => {
    if (fileName.endsWith('.html')) return HTMLFileIcon;
    if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx') || fileName.endsWith('.js')) return TSXFileIcon;
    if (fileName.endsWith('.css')) return CSSFileIcon;
    return FileIcon;
};

export const getLanguageForSyntaxHighlighter = (fileName: string) => {
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