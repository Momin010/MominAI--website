



import React, { useEffect, useRef } from 'react';
import { Terminal as XtermTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { useWebContainer } from '../WebContainerProvider.tsx';

export const Terminal: React.FC = () => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const { webContainer } = useWebContainer();
    const isTerminalAttached = useRef(false);

    useEffect(() => {
        // The setup logic (npm install, npm run dev) has been moved to WebContainerProvider
        // to ensure it runs automatically when the IDE loads, regardless of whether
        // the terminal is visible. This component is now only for display if needed.
        if (!webContainer || isTerminalAttached.current || !terminalRef.current) {
            return;
        }
        
        isTerminalAttached.current = true;
        const terminal = new XtermTerminal({
            cursorBlink: true,
            convertEol: true,
            theme: { background: 'transparent', foreground: '#e5e5e5', cursor: 'var(--accent-primary)' },
            fontFamily: 'monospace', fontSize: 14,
        });
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(terminalRef.current);
        fitAddon.fit();
        
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(() => fitAddon.fit());
        });
        resizeObserver.observe(terminalRef.current);

        return () => {
            resizeObserver.disconnect();
            terminal.dispose();
            isTerminalAttached.current = false;
        };
    }, [webContainer]);

    return (
        <div className="h-full w-full">
            <div ref={terminalRef} className="h-full w-full" />
        </div>
    );
};