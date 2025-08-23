import React from 'react';
import { MominAILogo } from '../icons.tsx';

interface HeaderProps {
    onLogout: () => void;
    onClearSession: () => void;
}

const Header = ({ onLogout, onClearSession }: HeaderProps) => (
    <header className="ide-header">
        <div className="header-left">
            <MominAILogo width={100} height={22} />
        </div>
        <div className="header-right">
             <button onClick={onClearSession} className="header-btn clear-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                Clear Session
            </button>
            <button onClick={onLogout} className="header-btn logout-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Logout
            </button>
        </div>
    </header>
);

export default Header;
