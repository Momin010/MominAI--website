



import React from 'react';
import CodeMirrorEditor from './CodeMirrorEditor.tsx';
import type { Diagnostic } from '../types.ts';
import { Icons } from './Icon.tsx';
import PreviewContainer from './PreviewContainer.tsx';
import { FileIcon } from './FileIcon.tsx';


interface EditorPaneProps {
  openFiles: string[];
  activeTab: string | null;
  onTabSelect: (path: string) => void;
  onTabClose: (path: string) => void;
  fileContent: string;
  onContentChange: (path: string, content: string) => void;
  diagnostics: Diagnostic[];
  breakpoints: number[];
  onBreakpointsChange: (path: string, newBreakpoints: number[]) => void;
  onEditorMount: (editor: any) => void;
  serverUrl: string | null;
  previewIframeRef: React.RefObject<HTMLIFrameElement>;
}

const EditorPane: React.FC<EditorPaneProps> = ({
  openFiles,
  activeTab,
  onTabSelect,
  onTabClose,
  fileContent,
  onContentChange,
  diagnostics,
  breakpoints,
  onBreakpointsChange,
  onEditorMount,
  serverUrl,
  previewIframeRef,
}) => {
  const isFileActive = activeTab && activeTab !== 'preview';

  return (
    <div className="flex flex-col h-full w-full bg-[var(--background-secondary)]/70 backdrop-blur-md rounded-lg shadow-xl">
      <div className="flex-shrink-0 bg-[var(--gray-dark)]/50 flex items-center rounded-t-lg overflow-x-auto">
        <Tab
          label="Preview"
          isActive={activeTab === 'preview'}
          onSelect={() => onTabSelect('preview')}
          onClose={null}
          icon={<Icons.Eye className="w-4 h-4 mr-2"/>}
        />
        {openFiles.map(path => (
          <Tab
            key={path}
            label={path.split('/').pop() || ''}
            isActive={activeTab === path}
            onSelect={() => onTabSelect(path)}
            onClose={() => onTabClose(path)}
            icon={<FileIcon filename={path.split('/').pop() || ''} className="w-4 h-4 mr-2" />}
          />
        ))}
      </div>
      <div className="flex-grow w-full h-full overflow-hidden flex">
        {activeTab === 'preview' ? (
           <PreviewContainer 
                isVisible={true} title=""
                serverUrl={serverUrl}
                previewContext={null} iframeRef={previewIframeRef}
                onToggleInspector={()=>{}} isInspectorActive={false}
            >
                <iframe src={serverUrl || ''} className="w-full h-full rounded-b-lg border-none bg-white" />
            </PreviewContainer>
        ) : isFileActive ? (
            <CodeMirrorEditor
                key={activeTab}
                value={fileContent}
                onChange={(content) => onContentChange(activeTab, content || '')}
                path={activeTab}
                diagnostics={diagnostics}
                breakpoints={breakpoints}
                onBreakpointsChange={onBreakpointsChange}
                onEditorMount={onEditorMount}
            />
        ) : (
          <WelcomeScreen />
        )}
      </div>
    </div>
  );
};

interface TabProps {
  label: string;
  isActive: boolean;
  onSelect: () => void;
  onClose: (() => void) | null;
  icon: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onSelect, onClose, icon }) => {

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if(onClose) onClose();
  };

  return (
    <div
      onClick={onSelect}
      className={`flex items-center justify-between p-2 cursor-pointer text-sm border-r border-t border-transparent transition-colors duration-200 relative whitespace-nowrap ${
        isActive
          ? 'bg-[var(--background-secondary)]/90 text-[var(--foreground)] border-t-[var(--accent)]'
          : 'bg-transparent text-[var(--gray)] hover:bg-[var(--gray-dark)]/50'
      }`}
    >
      <div className="flex items-center px-2">
        {icon}
        <span>{label}</span>
      </div>
      {onClose && (
         <button
            onClick={handleClose}
            className="ml-3 w-5 h-5 flex items-center justify-center rounded-full hover:bg-[var(--gray-light)]/80 flex-shrink-0"
        >
            <Icons.X className="w-3 h-3"/>
        </button>
      )}
    </div>
  );
};


const WelcomeScreen: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-[var(--gray)] p-8 select-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]/50 mb-4 opacity-50"><path d="m12 3-8.89 3.55a2 2 0 0 0-1.11 1.78V15.7a2 2 0 0 0 1.11 1.78L12 21l8.89-3.55a2 2 0 0 0 1.11-1.78V8.28a2 2 0 0 0-1.11-1.78L12 3Z"/><path d="M12 21v-8.52"/><path d="m20.89 8.28-8.89 3.55-8.89-3.55"/><path d="m3.11 8.28 8.89 3.55L20.89 8.28"/><path d="M12 3v8.52"/></svg>
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">MominAI IDE</h2>
        <p className="mt-2 text-center max-w-sm">Your AI-powered development environment. Select a file from the explorer to begin, or ask the AI to create one for you.</p>
        <p className="text-sm mt-4">Press <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl+Shift+P</kbd> to open the Command Palette.</p>
    </div>
);


export default EditorPane;