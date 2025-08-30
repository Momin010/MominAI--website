
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { WebContainer } from '@webcontainer/api';
import type { WebContainer as WebContainerType } from '@webcontainer/api';
import { files as defaultFiles } from './defaultFiles.ts';
import type { Directory, FileSystemNode } from './types.ts';

// Helper function to recursively read the directory structure from WebContainer
const readDirectory = async (wc: WebContainerType, path: string): Promise<Directory> => {
    const entries = await wc.fs.readdir(path, { withFileTypes: true });
    const children: { [key: string]: FileSystemNode } = {};

    for (const entry of entries) {
        const newPath = path === '/' ? `/${entry.name}` : `${path}/${entry.name}`;
        if (entry.isDirectory()) {
            children[entry.name] = await readDirectory(wc, newPath);
        } else {
            const content = await wc.fs.readFile(newPath, 'utf-8');
            children[entry.name] = { type: 'file', content };
        }
    }
    return { type: 'directory', children };
};

interface WebContainerContextType {
    webContainer: WebContainerType | null;
    isLoading: boolean;
    serverUrl: string | null;
    error: string | null;
    fs: Directory | null;
    runCommand: (command: string, args: string[]) => Promise<void>;
    setupLog: string[];
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
    const [fs, setFs] = useState<Directory | null>(null);
    const [setupLog, setSetupLog] = useState<string[]>(['Booting WebContainer...']);
    const isBooted = useRef(false);

    useEffect(() => {
        const boot = async () => {
            if (isBooted.current) return;
            isBooted.current = true;

            try {
                const wc = await WebContainer.boot();
                setWebContainer(wc);

                setSetupLog(prev => [...prev, 'Mounting file system...']);
                await wc.mount(defaultFiles);
                
                const logStream = (process: any, prefix: string) => {
                    process.output.pipeTo(new WritableStream({
                        write(data) {
                             setSetupLog(prev => [...prev, `${prefix}: ${data}`.trim()]);
                        }
                    }));
                };

                setSetupLog(prev => [...prev, 'Installing dependencies... (This may take a moment)']);
                // Use 'npm ci' for faster, deterministic installs from package-lock.json
                const installProcess = await wc.spawn('npm', ['ci']);
                logStream(installProcess, 'npm ci');
                const installExitCode = await installProcess.exit;

                if (installExitCode !== 0) {
                    const errorMsg = `Installation failed with exit code ${installExitCode}`;
                    setSetupLog(prev => [...prev, `ERROR: ${errorMsg}`]);
                    setError(errorMsg);
                    setIsLoading(false);
                    return;
                }
                
                setSetupLog(prev => [...prev, 'Dependencies installed.']);
                setSetupLog(prev => [...prev, 'Starting dev server...']);
                const devProcess = await wc.spawn('npm', ['run', 'dev']);
                logStream(devProcess, 'npm run dev');

                wc.on('server-ready', async (port, url) => {
                    setServerUrl(url);
                    setSetupLog(prev => [...prev, `Server is ready at ${url}`]);
                    
                    setSetupLog(prev => [...prev, 'Reading file system...']);
                    const rootFs = await readDirectory(wc, '/');
                    setFs(rootFs);
                    
                    setSetupLog(prev => [...prev, 'IDE is ready.']);
                    setIsLoading(false); // IDE is fully ready only after FS read
                });

                wc.on('error', (err) => {
                    setError(err.message);
                    setSetupLog(prev => [...prev, `WEBCONTAINER ERROR: ${err.message}`]);
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
        // This is a simplified version. A real implementation would pipe output to the terminal.
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
        fs,
        runCommand,
        setupLog
    };

    return (
        <WebContainerContext.Provider value={value}>
            {children}
        </WebContainerContext.Provider>
    );
};
