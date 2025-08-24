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
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [status, setStatus] = useState<Status>('idle');
    const [previewUrl, setPreviewUrl] = useState('');
    const [error, setError] = useState<string | null>(null);
    const lastFilesRef = useRef<AppFile[]>([]);
    const processRef = useRef<WebContainerProcess | null>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            const handleMouseEnter = () => document.body.classList.add('native-cursor-active');
            const handleMouseLeave = () => document.body.classList.remove('native-cursor-active');

            iframe.addEventListener('mouseenter', handleMouseEnter);
            iframe.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                iframe.removeEventListener('mouseenter', handleMouseEnter);
                iframe.removeEventListener('mouseleave', handleMouseLeave);
                document.body.classList.remove('native-cursor-active');
            };
        }
    }, [previewUrl]);

    useEffect(() => {
        const bootAndRun = async () => {
            if (files.length === 0) {
                 if (wcInstanceRef.current) {
                    // If files are cleared, reset state
                    setStatus('idle');
                    setPreviewUrl('');
                    setError(null);
                    lastFilesRef.current = [];
                 }
                return;
            };

            // Only run if files have actually changed
            if (JSON.stringify(files) === JSON.stringify(lastFilesRef.current)) {
                return;
            }
            lastFilesRef.current = files;
            
            // Kill any previous process
            if (processRef.current) {
                await processRef.current.kill();
                processRef.current = null;
            }

            setPreviewUrl('');
            setError(null);

            try {
                // Boot WebContainer if it hasn't been already
                if (!wcInstanceRef.current) {
                    setStatus('booting');
                    const wc = await WebContainer.boot();
                    wc.on('server-ready', (port, url) => {
                        console.log(`Server ready at ${url}`);
                        setPreviewUrl(url);
                        setStatus('running');
                    });
                     wc.on('error', (err) => {
                        console.error('WebContainer Error:', err);
                        setError(err.message);
                        setStatus('error');
                    });
                    wcInstanceRef.current = wc;
                }
                
                const wc = wcInstanceRef.current;
                
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
                
                setStatus('installing');
                const installProcess = await wc.spawn('npm', ['install']);
                if (await installProcess.exit !== 0) {
                    throw new Error('npm install failed');
                }
                
                setStatus('starting-server');
                
                const devProcessArgs = ['run', 'dev', '--', '--host'];
                const indexHtmlFile = files.find(f => f.name.endsWith('index.html'));

                if (indexHtmlFile && indexHtmlFile.name !== 'index.html') {
                    const rootDir = indexHtmlFile.name.substring(0, indexHtmlFile.name.lastIndexOf('/'));
                    if (rootDir) {
                        devProcessArgs.push('--root', rootDir);
                    }
                }

                const devProcess = await wc.spawn('npm', devProcessArgs);
                processRef.current = devProcess;

                devProcess.output.pipeTo(new WritableStream({
                    write(data) {
                        console.log('Dev Server:', data);
                    }
                }));

            } catch (err) {
                console.error('Error during project run:', err);
                const errorMessage = err instanceof Error ? err.message : String(err);
                // Avoid setting error for process kill
                if (!errorMessage.includes('process was killed')) {
                    setError(errorMessage);
                    setStatus('error');
                }
            }
        };
        
        bootAndRun();

    }, [files]);
    
    const StatusIndicator = () => (
        <div className="empty-state">
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {status === 'running' && <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                {(status === 'booting' || status === 'installing' || status === 'starting-server') && <g strokeLinecap="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3l-2.3 2.3a6 6 0 0 0-14.2 4"/></g>}
                {status === 'error' && <><path strokeLinecap="round" d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path strokeLinecap="round" d="M12 9v4"/><path strokeLinecap="round" d="M12 17h.01"/></>}
                {status === 'idle' && <><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></>}
             </svg>
             <p>{statusMessages[status]}</p>
             {error && <span style={{ color: '#ff8080', maxWidth: '300px', whiteSpace: 'pre-wrap'}}>{error}</span>}
             {status === 'idle' && <span>Generate an application to see it here</span>}
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
                        ref={iframeRef}
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