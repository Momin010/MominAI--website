import React from 'react';
import { AppFile } from './types.ts';
import { getFileIcon } from './utils.ts';

interface FileExplorerProps {
    files: AppFile[];
    activeFileName: string | null;
    onFileSelect: (fileName: string) => void;
}

const FileExplorer = ({ files, activeFileName, onFileSelect }: FileExplorerProps) => (
    <div className="file-explorer">
        <div className="panel-title-container">
            <div className="panel-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                Files
            </div>
        </div>
        <div className="file-tree">
            {files.length > 0 ? files.map(file => {
                const Icon = getFileIcon(file.name);
                return (
                    <div key={file.name} className={`file-item ${activeFileName === file.name ? 'active' : ''}`} onClick={() => onFileSelect(file.name)}>
                        <div className="file-icon"><Icon /></div>
                        <span className="file-name">{file.name}</span>
                    </div>
                );
            }) : (
                <div className="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
                    <p>No files yet</p>
                    <span>Start a conversation to generate code</span>
                </div>
            )}
        </div>
    </div>
);

export default FileExplorer;