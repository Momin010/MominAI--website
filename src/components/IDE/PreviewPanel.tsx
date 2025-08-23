import React, { useState, useEffect, useRef } from 'react';
import { WebContainer } from '@webcontainer/api';
import type { WebContainer as WebContainerType, WebContainerProcess } from '@webcontainer/api';
import { AppFile } from './types.ts';

interface PreviewPanelProps {
    files: AppFile[];
}

type Status = 'idle' | 'booting' | 'installing' | 'starting-server' | 'running' | 'error';

const statusMessages: Record<Status, string> = {
    idle: 'Ready to build.',
    booting: 'Booting WebContainer...',
    installing: 'Installing dependencies...',
    'starting-server': 'Starting dev server...',
    running: 'Live preview is running.',
    error: 'An error occurred.',
};


const PreviewPanel = ({ files }: PreviewPanelProps) => {
    const wcInstanceRef = useRef<WebContainerType | null>(null);
    const [status, setStatus] = useState<Status>('idle');
    const [previewUrl, setPreviewUrl] = useState('');
    const [error, setError] = useState<string | null>(null);
    const lastFilesRef = useRef<AppFile[]>([]);

    useEffect(() => {
        const bootWebContainer = async () => {
            if (wcInstanceRef.current || files.length === 0) return;
            
            console.log('Booting WebContainer...');
            setStatus('booting');
            try {
                const wc = await WebContainer.boot();
                wcInstanceRef.current = wc;
                console.log('WebContainer booted.');
                
                wc.on('error', (err) => {
                    console.error('WebContainer Error:', err);
                    setError(err.message);
                    setStatus('error');
                });
            } catch (err) {
                console.error('Failed to boot WebContainer:', err);
                setError(err instanceof Error ? err.message : String(err));
                setStatus('error');
            }
        };

        if (files.length > 0 && !wcInstanceRef.current && status === 'idle') {
            bootWebContainer();
        }

    }, [files, status]);

    useEffect(() => {
        const runProject = async () => {
            const wc = wcInstanceRef.current;
            if (!wc || files.length === 0) return;

            // Simple deep comparison to avoid unnecessary re-runs
            if (JSON.stringify(files) === JSON.stringify(lastFilesRef.current)) {
                return;
            }
            lastFilesRef.current = files;

            console.log('Project update detected, starting build process...');
            setPreviewUrl('');
            setError(null);
            
            try {
                console.log('Writing files to WebContainer...');
                // Use Promise.all for concurrent file writing
                await Promise.all(
                    files.map(file => {
                        const pathParts = file.name.split('/').filter(p => p);
                        if (pathParts.length > 1) {
                            const dir = `/${pathParts.slice(0, -1).join('/')}`;
                            return wc.fs.mkdir(dir, { recursive: true })
                                .then(() => wc.fs.writeFile(`/${file.name}`, file.content));
                        }
                        return wc.fs.writeFile(`/${file.name}`, file.content);
                    })
                );
                
                console.log('Files written. Installing dependencies...');
                setStatus('installing');
                
                const installProcess = await wc.spawn('npm', ['install']);
                if (await installProcess.exit !== 0) {
                    throw new Error('npm install failed');
                }
                
                console.log('Dependencies installed. Starting dev server...');
                setStatus('starting-server');
                
                const devProcess = await wc.spawn('npm', ['run', 'dev']);

                devProcess.output.pipeTo(new WritableStream({
                    write(data) {
                        console.log('Dev Server:', data);
                    }
                }));

                wc.on('server-ready', (port, url) => {
                    console.log(`Server ready at ${url}`);
                    setPreviewUrl(url);
                    setStatus('running');
                });

            } catch (err) {
                console.error('Error during project run:', err);
                setError(err instanceof Error ? err.message : String(err));
                setStatus('error');
            }
        };
        
        if (wcInstanceRef.current) {
            runProject();
        }

    }, [files]);
    
    const StatusIndicator = () => (
        <div className="empty-state">
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {status === 'running' && <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                {(status === 'booting' || status === 'installing' || status === 'starting-server') && <g strokeLinecap="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3l-2.3 2.3a6 6 0 0 0-14.2 4"/></g>}
                {status === 'error' && <><path strokeLinecap="round" d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path strokeLinecap="round" d="M12 9v4"/><path strokeLinecap="round" d="M12 17h.01"/></>}
                {status === 'idle' && files.length > 0 && <><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></>}
             </svg>
             <p>{statusMessages[status]}</p>
             {error && <span style={{ color: '#ff8080', maxWidth: '300px', whiteSpace: 'pre-wrap'}}>{error}</span>}
             {status === 'idle' && files.length === 0 && <span>Generate an application to see it here</span>}
        </div>
    );

    return (
        <div className="preview-panel">
            <div className="preview-header">
                <div className="panel-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    Preview
                </div>
            </div>
            <div className="preview-content">
                {previewUrl ? (
                    <iframe
                        src={previewUrl}
                        className="preview-frame"
                        title="Application Preview"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                    />
                ) : (
                    <div className="preview-empty">
                       <StatusIndicator />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PreviewPanel;