



import React from 'react';
import { Icons } from './Icon';

interface TitleBarProps {
  onLogout: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ onLogout }) => {
  return (
    <div className="bg-[var(--ui-panel-bg-heavy)] text-white/90 px-4 py-2 flex items-center justify-between flex-shrink-0 rounded-t-lg shadow-xl">
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent-secondary)]"><path d="m12 3-8.89 3.55a2 2 0 0 0-1.11 1.78V15.7a2 2 0 0 0 1.11 1.78L12 21l8.89-3.55a2 2 0 0 0 1.11-1.78V8.28a2 2 0 0 0-1.11-1.78L12 3Z"/><path d="M12 21v-8.52"/><path d="m20.89 8.28-8.89 3.55-8.89-3.55"/><path d="m3.11 8.28 8.89 3.55L20.89 8.28"/><path d="M12 3v8.52"/></svg>
        <h1 className="font-bold">MominAI IDE</h1>
      </div>
      <div className="flex items-center space-x-1">
        <button title="Logout" onClick={onLogout} className={`p-1.5 rounded text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors`}>
          <Icons.LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;