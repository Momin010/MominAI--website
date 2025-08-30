import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { WebContainer } from '@webcontainer/api';
import type { WebContainer as WebContainerType } from '@webcontainer/api';
import { files as defaultFiles } from './defaultFiles.ts';
import type { Directory } from './types.ts';

interface WebContainerContextType {
    webContainer: WebContainerType | null;
    isLoading: boolean;
    serverUrl: string | null;
    error: string | null;
    fs: Directory | null;
    runCommand: (command: string, args: string[]) => Promise<void>;
}

const WebContainerContext = createContext<WebContainerContextType | undefined>(undefined);

export const useWebContainer = () => {
    const context = useContext(WebContainerContext);
    if (!context) {
        throw new Error('useWebContainer must be used within a WebContainerProvider');
    }
    return context;
};

export const WebContainerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [webContainer, setWebContainer] = useState<WebContainerType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [serverUrl, setServerUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const isBooted = useRef(false);

    useEffect(() => {
        const boot = async () => {
            if (isBooted.current) return;
            isBooted.current = true;

            try {
                const wc = await WebContainer.boot();
                setWebContainer(wc);

                await wc.mount(defaultFiles);
                
                const installProcess = await wc.spawn('npm', ['install']);
                const installExitCode = await installProcess.exit;

                if (installExitCode !== 0) {
                    setError(`Installation failed with exit code ${installExitCode}`);
                    setIsLoading(false);
                    return;
                }
                
                const devProcess = await wc.spawn('npm', ['run', 'dev']);

                wc.on('server-ready', (port, url) => {
                    setServerUrl(url);
                    setIsLoading(false);
                });

                wc.on('error', (err) => {
                    setError(err.message);
                });

            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
                setIsLoading(false);
            }
        };

        boot();
    }, []);
    
    const runCommand = async (command: string, args: string[]) => {
        if (!webContainer) return;
        const process = await webContainer.spawn(command, args);
        const result = await process.exit;
        if (result !== 0) {
            console.error(`Command "${command} ${args.join(' ')}" failed.`);
        }
    };

    const value = {
        webContainer,
        isLoading,
        serverUrl,
        error,
        fs: null, // Filesystem is now managed by the useFileSystem hook
        runCommand,
    };

    return (
        <WebContainerContext.Provider value={value}>
            {children}
        </WebContainerContext.Provider>
    );
};
