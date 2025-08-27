
import React, { useState, useRef, useCallback, useEffect } from 'react';

interface ResizablePanelsProps {
  leftPanel: React.ReactNode;
  mainPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  bottomPanel: React.ReactNode;
  panelVisibility: { left: boolean; right: boolean; bottom: boolean };
}

const Divider: React.FC<{ onMouseDown: (e: React.MouseEvent) => void; orientation: 'vertical' | 'horizontal' }> = ({ onMouseDown, orientation }) => {
  const isVertical = orientation === 'vertical';
  const classes = isVertical
    ? 'w-1.5 h-full cursor-col-resize'
    : 'w-full h-1.5 cursor-row-resize';
  const innerClasses = isVertical
    ? 'w-px h-full'
    : 'w-full h-px';
  
  return (
    <div onMouseDown={onMouseDown} className={`bg-transparent group flex items-center justify-center transition-colors duration-200 hover:bg-[var(--accent)]/20 flex-shrink-0 ${classes}`}>
      <div className={`bg-[var(--border-color)] group-hover:bg-[var(--accent)] ${innerClasses}`}></div>
    </div>
  );
};


const ResizablePanels: React.FC<ResizablePanelsProps> = ({ leftPanel, mainPanel, rightPanel, bottomPanel, panelVisibility }) => {
  const [leftWidth, setLeftWidth] = useState(25);
  const [rightWidth, setRightWidth] = useState(25);
  const [bottomHeight, setBottomHeight] = useState(30);
  const { left: isLeftVisible, right: isRightVisible, bottom: isBottomVisible } = panelVisibility;

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<string | null>(null);

  const onDrag = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();

    requestAnimationFrame(() => {
        if (!isDragging.current) return;
        if (isDragging.current === 'left') {
          const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
          setLeftWidth(Math.max(15, Math.min(newLeftWidth, 50)));
        } else if (isDragging.current === 'right') {
          const newRightWidth = ((containerRect.right - e.clientX) / containerRect.width) * 100;
          setRightWidth(Math.max(15, Math.min(newRightWidth, 50)));
        } else if (isDragging.current === 'bottom') {
          const newBottomHeight = ((containerRect.bottom - e.clientY) / containerRect.height) * 100;
          setBottomHeight(Math.max(15, Math.min(newBottomHeight, 85)));
        }
    });
  }, []);

  const onDragEnd = useCallback(() => {
    isDragging.current = null;
    document.body.style.cursor = '';
    document.body.classList.remove('select-none');
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
  }, [onDrag]);

  const onDragStart = useCallback((divider: 'left' | 'right' | 'bottom', e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = divider;
    document.body.style.cursor = divider === 'bottom' ? 'row-resize' : 'col-resize';
    document.body.classList.add('select-none');
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onDragEnd);
  }, [onDrag, onDragEnd]);

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', onDragEnd);
    };
  }, [onDrag, onDragEnd]);
  
  const finalLeftWidth = isLeftVisible ? leftWidth : 0;
  const finalRightWidth = isRightVisible ? rightWidth : 0;
  const mainHorizontalWidth = 100 - finalLeftWidth - finalRightWidth;

  return (
    <div ref={containerRef} className="w-full h-full flex overflow-hidden">
      {isLeftVisible && (
          <div style={{ width: `${leftWidth}%` }} className="h-full min-w-0">
            {leftPanel}
          </div>
      )}
      {isLeftVisible && <Divider onMouseDown={(e) => onDragStart('left', e)} orientation="vertical" />}

      <div style={{ width: `${mainHorizontalWidth}%` }} className="h-full flex flex-col min-w-0">
        <div style={{ height: `${isBottomVisible ? 100 - bottomHeight : 100}%` }} className="w-full overflow-hidden min-h-0">
           {mainPanel}
        </div>
        
        {isBottomVisible && <Divider onMouseDown={(e) => onDragStart('bottom', e)} orientation="horizontal" />}
        
        {isBottomVisible && (
            <div style={{ height: `${bottomHeight}%` }} className="w-full overflow-hidden min-h-0">
              {bottomPanel}
            </div>
        )}
      </div>
      
      {isRightVisible && <Divider onMouseDown={(e) => onDragStart('right', e)} orientation="vertical" />}
      {isRightVisible && (
          <div style={{ width: `${rightWidth}%` }} className="h-full min-w-0">
            {rightPanel}
          </div>
      )}
    </div>
  );
};

export default ResizablePanels;
