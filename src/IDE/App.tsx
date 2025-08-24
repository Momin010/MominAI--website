
import React, { useState, useCallback, useRef, createContext, useContext, ReactNode } from 'react';
import { WebContainerProvider, useWebContainer } from './WebContainerProvider.tsx';
import { useFileSystem } from './hooks/useFileSystem.ts';
import Loader from '../../components/Loader.tsx';
import ResizablePanels from './components/ResizablePanels.tsx';
import { StatusBar } from './components/StatusBar.tsx';
import { Terminal } from './components/Terminal.tsx';
import EditorPane from './components/EditorPane.tsx';
import ActivityBar from './components/ActivityBar.tsx';
import SideBar from './components/SideBar.tsx';
import FileExplorer from './components/FileExplorer.tsx';
import TitleBar from './components/TitleBar.tsx';
import PreviewContainer from './components/PreviewContainer.tsx';
import type { Notification } from './types.ts';
import { Icons } from './components/Icon.tsx';

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
                <Icons.X className="w-4 h-4" />
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


const AppContent = () => {
    const { isLoading: isWcLoading, error, serverUrl } = useWebContainer();
    const { fs, isLoading: isFsLoading, updateNode, createNode, deleteNode, renameNode, moveNode } = useFileSystem();
    
    const [openFiles, setOpenFiles] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [activeView, setActiveView] = useState('explorer');
    const [panelVisibility, setPanelVisibility] = useState({ left: true, right: true, bottom: true });
    
    const previewIframeRef = useRef<HTMLIFrameElement>(null);

    const handleFileSelect = useCallback((path: string) => {
        if (!openFiles.includes(path)) {
            setOpenFiles(prev => [...prev, path]);
        }
        setActiveTab(path);
    }, [openFiles]);

    const handleTabClose = useCallback((path: string) => {
        setOpenFiles(prev => {
            const newOpenFiles = prev.filter(p => p !== path);
            if (activeTab === path) {
                setActiveTab(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : null);
            }
            return newOpenFiles;
        });
    }, [activeTab]);

    const handleContentChange = useCallback((path: string, content: string) => {
        updateNode(path, content);
    }, [updateNode]);

    const togglePanel = (panel: 'left' | 'right' | 'bottom') => {
        setPanelVisibility(prev => ({ ...prev, [panel]: !prev[panel] }));
    };

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
    
    const getFileContent = (path: string | null): string => {
        if (!path || !fs) return '';
        const parts = path.split('/').filter(p => p);
        let node = fs;
        for (const part of parts) {
            if (node.type === 'directory' && node.children[part]) {
                const child = node.children[part];
                if (child.type === 'directory') {
                    node = child;
                } else if (child.type === 'file' && parts.indexOf(part) === parts.length - 1) {
                    return child.content;
                }
            } else {
                 const file = node.children[part];
                 if(file?.type === 'file') {
                    return file.content;
                 }
            }
        }
        return '';
    };

    return (
        <div className="w-full h-full bg-[var(--ui-panel-bg)] backdrop-blur-md flex flex-col gap-4">
            <TitleBar onTogglePanel={togglePanel} panelVisibility={panelVisibility} />
            <div className="flex-grow flex min-h-0">
                {panelVisibility.left && <ActivityBar activeView={activeView} setActiveView={setActiveView} />}
                <div className={`flex-grow ${panelVisibility.left ? 'ml-4' : ''}`}>
                    <ResizablePanels
                        panelVisibility={panelVisibility}
                        leftPanel={
                            <SideBar activeView={activeView}>
                                <FileExplorer 
                                    fs={fs!}
                                    onFileSelect={handleFileSelect}
                                    createNode={createNode}
                                    deleteNode={deleteNode}
                                    renameNode={renameNode}
                                    moveNode={moveNode}
                                    openAiFileGenerator={() => {}} // Placeholder
                                />
                                <div/> <div/> <div/> <div/> <div/> <div/>
                            </SideBar>
                        }
                        mainPanel={
                            <EditorPane
                                openFiles={openFiles}
                                activeTab={activeTab}
                                onTabSelect={setActiveTab}
                                onTabClose={handleTabClose}
                                fileContent={getFileContent(activeTab)}
                                onContentChange={handleContentChange}
                                editorActions={[]} diagnostics={[]} breakpoints={[]}
                                onBreakpointsChange={() => {}} pluginViews={{}}
                            />
                        }
                        rightPanel={
                            <PreviewContainer 
                                isVisible={true} title="Live Preview" onClose={() => togglePanel('right')}
                                previewContext={null} iframeRef={previewIframeRef}
                                onToggleInspector={()=>{}} isInspectorActive={false}
                            >
                               <iframe src={serverUrl || ''} className="w-full h-full rounded-b-lg border-none bg-white" />
                            </PreviewContainer>
                        }
                        bottomPanel={ <Terminal /> }
                    />
                </div>
            </div>
            <StatusBar activeFile={activeTab} customItems={[]} diagnostics={[]} collaborators={[]} voiceStatus='idle' onVoiceToggle={()=>{}} supabaseUser={null} />
        </div>
    );
};


const App = () => {
    return (
        <NotificationProvider>
            <WebContainerProvider>
                <AppContent />
            </WebContainerProvider>
        </NotificationProvider>
    );
};

export default App;
