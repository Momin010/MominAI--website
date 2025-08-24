import React, { useState, useCallback, useRef } from 'react';
import { useWebContainer } from './WebContainerProvider.tsx';
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
        // If the path points to a directory or not found, return empty
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
                                {/* Placeholder for other side panels */}
                                <div/>
                                <div/>
                                <div/>
                                <div/>
                                <div/>
                                <div/>
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
                                editorActions={[]}
                                diagnostics={[]}
                                breakpoints={[]}
                                onBreakpointsChange={() => {}}
                                pluginViews={{}}
                            />
                        }
                        rightPanel={
                            <PreviewContainer 
                                isVisible={true} 
                                title="Live Preview" 
                                onClose={() => togglePanel('right')}
                                previewContext={null}
                                iframeRef={previewIframeRef}
                                onToggleInspector={()=>{}}
                                isInspectorActive={false}
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

export default AppContent;
