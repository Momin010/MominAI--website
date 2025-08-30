



import React from 'react';
import { Icons } from './Icon';

interface ActivityBarProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ activeView, setActiveView }) => {
    const views = [
        { id: 'ai-assistant', icon: <Icons.Bot className="w-6 h-6"/>, title: 'AI Assistant' },
        { id: 'explorer', icon: <Icons.Files className="w-6 h-6"/>, title: 'Explorer' },
        { id: 'search', icon: <Icons.Search className="w-6 h-6"/>, title: 'Search' },
        { id: 'source-control', icon: <Icons.GitFork className="w-6 h-6"/>, title: 'Source Control' },
        { id: 'storyboard', icon: <Icons.LayoutDashboard className="w-6 h-6"/>, title: 'Storyboard' },
        { id: 'figma', icon: <Icons.Figma className="w-6 h-6"/>, title: 'Figma Import' },
        { id: 'plugins', icon: <Icons.Puzzle className="w-6 h-6"/>, title: 'Plugins' },
        { id: 'image-to-code', icon: <Icons.Image className="w-6 h-6"/>, title: 'Image to Code' },
        { id: 'settings', icon: <Icons.Settings className="w-6 h-6"/>, title: 'Settings' },
    ];
    
    return (
        <div className="bg-transparent h-full w-12 flex flex-col items-center py-4 space-y-2 rounded-l-lg">
            {views.map(view => (
                <button
                    key={view.id}
                    title={view.title}
                    onClick={() => setActiveView(view.id)}
                    className={`p-2 rounded-lg transition-all duration-200 relative 
                        ${activeView === view.id ? 'text-[var(--foreground)]' : 'text-[var(--gray)]'}
                        hover:text-[var(--foreground)] hover:bg-[var(--gray-dark)]/50
                    `}
                >
                    {activeView === view.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-[var(--accent)] rounded-r-full"></div>}
                    {view.icon}
                </button>
            ))}
        </div>
    );
};

export default ActivityBar;