



import React, { useState, useCallback, useRef, createContext, useContext, ReactNode, useEffect } from 'react';

// Providers & Hooks
import { WebContainerProvider, useWebContainer } from './WebContainerProvider.tsx';
import { useFileSystem } from './hooks/useFileSystem.ts';
import { useLocalStorageState } from '../hooks/useLocalStorageState.ts';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { CommandPaletteProvider, useCommandPalette } from './hooks/useCommandPalette.ts';
import { AIProvider } from './contexts/AIContext.tsx';
import { generateCodeForFile, generateComponentSet } from './services/aiService.ts';
import { getAllFiles } from './utils/fsUtils.ts';
import { allPlugins } from './plugins/index.ts';


// UI Components
import Loader from './components/Loader.tsx';
import { StatusBar } from './components/StatusBar.tsx';
import EditorPane from './components/EditorPane.tsx';
import ActivityBar from './components/ActivityBar.tsx';
import SideBar from './components/SideBar.tsx';
import FileExplorer from './components/FileExplorer.tsx';
import TitleBar from './components/TitleBar.tsx';
import CommandPalette from './components/CommandPalette.tsx';
import AiFileGeneratorModal from './components/AiFileGeneratorModal.tsx';
import AiComponentGeneratorModal from './components/AiComponentGeneratorModal.tsx';
import AIAssistant from './components/AIAssistant.tsx';


// Panel Components
import SearchPanel from './components/SearchPanel.tsx';
import SourceControlPanel from './components/SourceControlPanel.tsx';
import SettingsPanel from './components/SettingsPanel.tsx';
import StoryboardPanel from './components/StoryboardPanel.tsx';
import FigmaPanel from './components/FigmaPanel.tsx';
import ImageToCodePanel from './components/ImageToCodePanel.tsx';
import PluginPanel from './components/PluginPanel.tsx';


import type { Notification, Diagnostic, ConsoleMessage, DependencyReport, StoryboardComponent, SearchResult, FileSystemNode } from './types.ts';
import { analyzeCode } from './services/languageService.ts';


// --- NOTIFICATION SYSTEM ---
const NotificationContext = createContext<{ addNotification: (notification: Omit<Notification, 'id'>) => void; } | undefined>(undefined);

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
    return context;
};

const NotificationItem: React.FC<{ notification: Notification; onDismiss: () => void }> = ({ notification, onDismiss }) => {
    const colorClasses = {
        info: 'bg-blue-500/80',
        success: 'bg-green-500/80',
        warning: 'bg-yellow-500/80',
        error: 'bg-red-500/80',
    };
    return (
        <div className={`flex items-center justify-between w-full max-w-sm p-3 text-white rounded-lg shadow-lg ${colorClasses[notification.type]} backdrop-blur-md animate-fade-in-up`}>
            <p className="text-sm">{notification.message}</p>
            <button onClick={onDismiss} className="p-1 rounded-full hover:bg-white/20">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>
    );
};

const NotificationContainer: React.FC<{ notifications: Notification[]; removeNotification: (id: string) => void }> = ({ notifications, removeNotification }) => (
    <div className="fixed bottom-16 right-4 z-[9999] flex flex-col items-end space-y-2">
        {notifications.map(n => (
            <NotificationItem key={n.id} notification={n} onDismiss={() => removeNotification(n.id)} />
        ))}
    </div>
);

const NotificationProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const removeNotification = useCallback((id: string) => {
        setNotifications(current => current.filter(n => n.id !== id));
    }, []);

    const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        setNotifications(current => [...current, { ...notification, id }]);
        const duration = notification.duration || 5000;
        setTimeout(() => removeNotification(id), duration);
    }, [removeNotification]);

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
        </NotificationContext.Provider>
    );
};

interface IDEWorkspaceProps {
    onLogout: () => void;
}

const IDEWorkspace: React.FC<IDEWorkspaceProps> = ({ onLogout }) => {
    const { isLoading: isWcLoading, error, serverUrl } = useWebContainer();
    const { fs, isLoading: isFsLoading, updateNode, createNode, deleteNode, renameNode, moveNode } = useFileSystem();
    
    // UI State
    const [openFiles, setOpenFiles] = useState<string[]>(['/src/App.jsx']);
    const [activeRightTab, setActiveRightTab] = useState<string>('preview');
    const [activeView, setActiveView] = useState('ai-assistant');
    const [editorInstance, setEditorInstance] = useState<any>(null);
    
    // Feature State
    const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isFileGeneratorOpen, setIsFileGeneratorOpen] = useState(false);
    const [fileGenBasePath, setFileGenBasePath] = useState('/');
    const { addNotification } = useNotifications();
    
    // Config State
    const [githubToken, setGithubToken] = useLocalStorageState<string | null>('githubToken', null);
    const [geminiApiKey, setGeminiApiKey] = useLocalStorageState<string | null>('geminiApiKey', null);


    const previewIframeRef = useRef<HTMLIFrameElement>(null);
    const { registerCommand } = useCommandPalette();
    
    const [isComponentGeneratorOpen, setIsComponentGeneratorOpen] = useState(false);
    const [componentGenBasePath, setComponentGenBasePath] = useState('/');

     const getFileContent = useCallback((path: string | null): string => {
        if (!path || !fs) return '';
        const parts = path.split('/').filter(p => p);
        let node: FileSystemNode = fs;
        for (const part of parts) {
            if (node.type === 'directory' && node.children[part]) {
                node = node.children[part];
            } else {
                return ''; // Not found
            }
        }
        return node.type === 'file' ? node.content : '';
    }, [fs]);
    
    const runDiagnostics = useCallback((path: string | null) => {
        if (!path) {
            setDiagnostics([]);
            return;
        }
        const content = getFileContent(path);
        const language = path.split('.').pop() || '';
        const newDiagnostics = analyzeCode(content, language);
        setDiagnostics(newDiagnostics);
    }, [getFileContent]);
    

    const handleFileSelect = useCallback((path: string, line?: number) => {
        if (!openFiles.includes(path)) {
            setOpenFiles(prev => [...prev, path]);
        }
        setActiveRightTab(path);
        runDiagnostics(path);
    }, [openFiles, runDiagnostics]);

    const handleTabClose = useCallback((path: string) => {
        setOpenFiles(prev => {
            const newOpenFiles = prev.filter(p => p !== path);
            if (activeRightTab === path) {
                const newActiveTab = 'preview';
                setActiveRightTab(newActiveTab);
                runDiagnostics(null);
            }
            return newOpenFiles;
        });
    }, [activeRightTab, runDiagnostics]);

    const handleContentChange = useCallback((path: string, content: string) => {
        updateNode(path, content);
        runDiagnostics(path);
    }, [updateNode, runDiagnostics]);

    const performSearch = useCallback((query: string, options: { isCaseSensitive: boolean; isRegex: boolean }) => {
        if (!fs || !query) {
          setSearchResults([]);
          return;
        }
        setIsSearching(true);
        const newResults: SearchResult[] = [];
        const allFiles = getAllFiles(fs, "/");
        
        try {
            const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), options.isCaseSensitive ? 'g' : 'gi');
            
            for (const file of allFiles) {
                const lines = file.content.split('\n');
                lines.forEach((line, lineIndex) => {
                    let match;
                    while ((match = regex.exec(line)) !== null) {
                        newResults.push({
                            path: file.path,
                            line: lineIndex + 1,
                            content: line,
                            preMatch: line.substring(0, match.index),
                            match: match[0],
                            postMatch: line.substring(match.index + match[0].length),
                        });
                    }
                });
            }
        } catch (e) {
            addNotification({type: 'error', message: 'Invalid Search Query'});
        }

        setSearchResults(newResults);
        setIsSearching(false);
    }, [fs, addNotification]);

    const replaceAll = useCallback(async (query: string, replaceWith: string, options: { isCaseSensitive: boolean; isRegex: boolean; }) => {
        if (!fs || !query) return;

        const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), options.isCaseSensitive ? 'g' : 'gi');
        const allFiles = getAllFiles(fs, "/");
        let changesMade = 0;

        for (const file of allFiles) {
            if (regex.test(file.content)) {
                const newContent = file.content.replace(regex, replaceWith);
                if (file.content !== newContent) {
                    await updateNode(file.path, newContent);
                    changesMade++;
                }
            }
        }
        addNotification({type: 'success', message: `Replaced all occurrences in ${changesMade} files.`});
        setSearchResults([]);
    }, [fs, updateNode, addNotification]);

    const openAiFileGenerator = (path: string) => {
        setFileGenBasePath(path || '/');
        setIsFileGeneratorOpen(true);
    };

    const handleAiFileSubmit = async (basePath: string, filename: string, prompt: string) => {
        if (!geminiApiKey) {
            addNotification({ type: 'error', message: 'Please set your Gemini API key in the settings to use this feature.' });
            setActiveView('settings');
            throw new Error('API Key not set');
        }
        const fullPath = basePath === '/' ? `/${filename}` : `${basePath}/${filename}`;
        addNotification({ type: 'info', message: `Generating ${filename} with AI...` });
        try {
            const content = await generateCodeForFile(prompt, filename, geminiApiKey);
            await createNode(fullPath, 'file', content);
            addNotification({ type: 'success', message: `${filename} created successfully!` });
            handleFileSelect(fullPath);
        } catch (e) {
            if (e instanceof Error) addNotification({ type: 'error', message: e.message });
            throw e; // re-throw to keep modal open on error
        }
    };
    
    const openAiComponentGenerator = (path: string) => {
        setComponentGenBasePath(path || '/');
        setIsComponentGeneratorOpen(true);
    };

    const handleAiComponentSubmit = async (basePath: string, componentName: string, description: string) => {
         if (!geminiApiKey) {
            addNotification({ type: 'error', message: 'Please set your Gemini API key in the settings to use this feature.' });
            setActiveView('settings');
            throw new Error('API Key not set');
        }
        addNotification({ type: 'info', message: `Generating component set for ${componentName}...` });
        try {
            const { files } = await generateComponentSet(componentName, description, geminiApiKey);
            
            const componentDir = basePath === '/' ? `/${componentName}` : `${basePath}/${componentName}`;
            await createNode(componentDir, 'directory');

            for (const file of files) {
                const fullPath = `${componentDir}/${file.name}`;
                await createNode(fullPath, 'file', file.content);
            }
            addNotification({ type: 'success', message: `${componentName} component set created successfully!` });
            
            const componentFile = files.find(f => f.name.endsWith('.tsx') && !f.name.endsWith('.test.tsx'));
            if (componentFile) {
                const mainFilePath = `${componentDir}/${componentFile.name}`;
                handleFileSelect(mainFilePath);
            }
        } catch (e) {
            if (e instanceof Error) addNotification({ type: 'error', message: e.message });
            throw e; // re-throw to keep modal open on error
        }
    };

    useEffect(() => {
        if(registerCommand) {
            registerCommand({
                id: 'ai.component.generate',
                label: 'AI: New Component from Prompt...',
                category: 'AI',
                action: () => openAiComponentGenerator('/src/components'),
            });
        }
    }, [registerCommand]);
    
    useEffect(() => {
        runDiagnostics(activeRightTab);
    }, [activeRightTab, runDiagnostics]);


    if (isWcLoading || isFsLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-red-900/50 text-white p-4">
                <h2 className="text-2xl font-bold mb-4">Error</h2>
                <p className="text-center mb-4">Could not initialize the development environment.</p>
                <pre className="bg-black/50 p-4 rounded-lg text-sm max-w-2xl overflow-auto">{error}</pre>
            </div>
        );
    }
    
    return (
        <AIProvider
            createNode={createNode}
            updateNode={handleContentChange}
            openFile={handleFileSelect}
            fs={fs}
            geminiApiKey={geminiApiKey}
            editorInstance={editorInstance}
            setActiveTab={setActiveRightTab}
        >
            <div className="w-full h-full bg-transparent flex flex-col p-2 gap-2">
                 <CommandPalette />
                 <AiFileGeneratorModal
                    isOpen={isFileGeneratorOpen}
                    onClose={() => setIsFileGeneratorOpen(false)}
                    onSubmit={handleAiFileSubmit}
                    basePath={fileGenBasePath}
                    addNotification={addNotification}
                />
                <AiComponentGeneratorModal
                    isOpen={isComponentGeneratorOpen}
                    onClose={() => setIsComponentGeneratorOpen(false)}
                    onSubmit={handleAiComponentSubmit}
                    basePath={componentGenBasePath}
                    addNotification={addNotification}
                />

                <TitleBar onLogout={onLogout} />
                <div className="flex-grow flex min-h-0 gap-2">
                    {/* Left Panel */}
                    <div className="flex w-[30%] max-w-md min-w-[320px] rounded-lg shadow-xl bg-[var(--background-secondary)]/70 backdrop-blur-md">
                        <ActivityBar activeView={activeView} setActiveView={setActiveView} />
                        <div className="flex-grow min-w-0">
                            <SideBar activeView={activeView}>
                                <AIAssistant />
                                <FileExplorer 
                                    fs={fs!}
                                    onFileSelect={handleFileSelect}
                                    createNode={createNode}
                                    deleteNode={deleteNode}
                                    renameNode={renameNode}
                                    moveNode={moveNode}
                                    openAiFileGenerator={openAiFileGenerator}
                                    openAiComponentGenerator={openAiComponentGenerator}
                                />
                                <SearchPanel 
                                    performSearch={performSearch} 
                                    isSearching={isSearching} 
                                    searchResults={searchResults} 
                                    onResultClick={(path) => handleFileSelect(path)} 
                                    replaceAll={replaceAll}
                                    />
                                <SourceControlPanel fs={fs!} replaceFs={() => {}} githubToken={githubToken} switchView={setActiveView} supabaseUser={null} />
                                <StoryboardPanel components={[]} readNode={getFileContent} />
                                <FigmaPanel />
                                <PluginPanel plugins={allPlugins} />
                                <ImageToCodePanel />
                                <SettingsPanel 
                                    githubToken={githubToken} 
                                    setGithubToken={setGithubToken} 
                                    geminiApiKey={geminiApiKey}
                                    setGeminiApiKey={setGeminiApiKey}
                                    supabaseUser={null} 
                                    supabaseUrl={null} 
                                    setSupabaseUrl={() => {}} 
                                    supabaseAnonKey={null} 
                                    setSupabaseAnonKey={() => {}} 
                                />
                            </SideBar>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="flex-grow min-w-0">
                        <EditorPane
                            openFiles={openFiles}
                            activeTab={activeRightTab}
                            onTabSelect={setActiveRightTab}
                            onTabClose={handleTabClose}
                            fileContent={getFileContent(activeRightTab)}
                            onContentChange={handleContentChange}
                            diagnostics={diagnostics}
                            breakpoints={[]}
                            onBreakpointsChange={() => {}}
                            onEditorMount={setEditorInstance}
                            serverUrl={serverUrl}
                            previewIframeRef={previewIframeRef}
                        />
                    </div>
                </div>
                <StatusBar activeFile={openFiles.includes(activeRightTab) ? activeRightTab : null} customItems={[]} diagnostics={diagnostics} collaborators={[]} voiceStatus='idle' onVoiceToggle={()=>{}} supabaseUser={null} />
            </div>
        </AIProvider>
    );
};

interface AppProps {
    onLogout: () => void;
}

const App: React.FC<AppProps> = ({ onLogout }) => {
    return (
        <ThemeProvider>
            <CommandPaletteProvider>
                <NotificationProvider>
                    <WebContainerProvider>
                        <IDEWorkspace onLogout={onLogout} />
                    </WebContainerProvider>
                </NotificationProvider>
            </CommandPaletteProvider>
        </ThemeProvider>
    );
};

export default App;