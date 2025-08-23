import React from 'react';

const Terminal = () => (
    <div className="terminal-container">
        <div className="terminal-header">
            <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
            </div>
            <div className="terminal-title">bash</div>
        </div>
        <div className="terminal-body">
            <p>momin-ai@dev:~$ <span></span></p>
        </div>
    </div>
);

export default Terminal;
