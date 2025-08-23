import React from 'react';

interface PreviewPanelProps {
    previewUrl: string;
    onRefresh: () => void;
}

const PreviewPanel = ({ previewUrl, onRefresh }: PreviewPanelProps) => {
    return (
        <div className="preview-panel">
            <div className="preview-header">
                <div className="panel-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    Preview
                </div>
                <button onClick={onRefresh} className="refresh-btn" aria-label="Refresh preview">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                </button>
            </div>
            <div className="preview-content">
                {previewUrl ? (
                    <iframe
                        key={previewUrl} // Force re-render on URL change
                        src={previewUrl}
                        className="preview-frame"
                        title="Application Preview"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                ) : (
                    <div className="preview-empty">
                        <div className="empty-state">
                           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            <p>Preview not available</p>
                            <span>Generate an application to see it here</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PreviewPanel;
