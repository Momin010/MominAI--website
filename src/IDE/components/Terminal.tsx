import React, { useEffect, useRef } from 'react';
import { Terminal as XtermTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { useWebContainer } from '../WebContainerProvider.tsx';

export const Terminal: React.FC = () => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const { webContainer, isLoading } = useWebContainer();
    const isTerminalAttached = useRef(false);

    useEffect(() => {
        if (isLoading || !webContainer || isTerminalAttached.current || !terminalRef.current) {
            return;
        }

        const terminal = new XtermTerminal({
            cursorBlink: true,
            theme: { background: 'transparent', foreground: '#e5e5e5', cursor: 'var(--accent-primary)' },
            fontFamily: 'monospace', fontSize: 14, allowProposedApi: true
        });
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(terminalRef.current);
        fitAddon.fit();

        const attachShell = async () => {
            const shellProcess = await webContainer.spawn('jsh');
            isTerminalAttached.current = true;
            
            shellProcess.output.pipeTo(new WritableStream({
                write(data) {
                    terminal.write(data);
                }
            }));

            const input = shellProcess.input.getWriter();
            terminal.onData(data => {
                input.write(data);
            });

            const resizeObserver = new ResizeObserver(() => {
                requestAnimationFrame(() => {
                    fitAddon.fit();
                    shellProcess.resize({
                        cols: terminal.cols,
                        rows: terminal.rows
                    });
                });
            });
            
            if (terminalRef.current) {
                 resizeObserver.observe(terminalRef.current);
            }
            
            return () => {
                terminal.dispose();
                resizeObserver.disconnect();
                isTerminalAttached.current = false;
            };
        };

        const cleanupPromise = attachShell();

        return () => {
            cleanupPromise.then(cleanup => cleanup());
        };
    }, [webContainer, isLoading]);

    return (
        <div className="bg-[var(--ui-panel-bg)] backdrop-blur-md h-full w-full">
            <div ref={terminalRef} className="h-full w-full" />
        </div>
    );
};
