import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Encodes SVG string to be used as a data URI in CSS
const svgToDataURI = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

// --- CURSOR DEFINITIONS ---

// 1. Default Arrow Cursor (replaces the "open hand")
const arrowCursorSVG = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M2 2 L2 25 L9 18 L14 29 L18 27 L13 16 L22 16 Z" fill="white" stroke="black" stroke-width="1.5" stroke-linejoin="round" /></svg>`;

// 2. Pointer Hand Cursor (user-provided)
// The user's SVG has been cleaned up and wrapped in a <g> to align its hotspot (the fingertip) to the 0,0 coordinate.
const pointerCursorSVG = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g transform="translate(-8.5 -13.5)">
        <path fill="#FFFFFF" d="M11.3,20.4c-0.3-0.4-0.6-1.1-1.2-2c-0.3-0.5-1.2-1.5-1.5-1.9 c-0.2-0.4-0.2-0.6-0.1-1c0.1-0.6,0.7-1.1,1.4-1.1c0.5,0,1,0.4,1.4,0.7c0.2,0.2,0.5,0.6,0.7,0.8c0.2,0.2,0.2,0.3,0.4,0.5 c0.2,0.3,0.3,0.5,0.2,0.1c-0.1-0.5-0.2-1.3-0.4-2.1c-0.1-0.6-0.2-0.7-0.3-1.1 c-0.1-0.5-0.2-0.8-0.3-1.3c-0.1-0.3-0.2-1.1-0.3-1.5 c-0.1-0.5-0.1-1.4,0.3-1.8c0.3-0.3,0.9-0.4,1.3-0.2c0.5,0.3,0.8,1,0.9,1.3 c0.2,0.5,0.4,1.2,0.5,2c0.2,1,0.5,2.5,0.5,2.8 c0-0.4-0.1-1.1,0-1.5c0.1-0.3,0.3-0.7,0.7-0.8c0.3-0.1,0.6-0.1,0.9-0.1 c0.3,0.1,0.6,0.3,0.8,0.5c0.4,0.6,0.4,1.9,0.4,1.8 c0.1-0.4,0.1-1.2,0.3-1.6c0.1-0.2,0.5-0.4,0.7-0.5c0.3-0.1,0.7-0.1,1,0 c0.2,0,0.6,0.3,0.7,0.5c0.2,0.3,0.3,1.3,0.4,1.7 c0,0.1,0.1-0.4,0.3-0.7c0.4-0.6,1.8-0.8,1.9,0.6c0,0.7,0,0.6,0,1.1 c0,0.5,0,0.8,0,1.2c0,0.4-0.1,1.3-0.2,1.7 c-0.1,0.3-0.4,1-0.7,1.4c0,0-1.1,1.2-1.2,1.8c-0.1,0.6-0.1,0.6-0.1,1 c0,0.4,0.1,0.9,0.1,0.9s-0.8,0.1-1.2,0c-0.4-0.1-0.9-0.8-1-1.1 c-0.2-0.3-0.5-0.3-0.7,0c-0.2,0.4-0.7,1.1-1.1,1.1 c-0.7,0.1-2.1,0-3.1,0c0,0,0.2-1-0.2-1.4c-0.3-0.3-0.8-0.8-1.1-1.1L11.3,20.4z"/>
        <path fill="none" stroke="#000000" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" d=" M11.3,20.4c-0.3-0.4-0.6-1.1-1.2-2c-0.3-0.5-1.2-1.5-1.5-1.9c-0.2-0.4-0.2-0.6-0.1-1c0.1-0.6,0.7-1.1,1.4-1.1c0.5,0,1,0.4,1.4,0.7 c0.2,0.2,0.5,0.6,0.7,0.8c0.2,0.2,0.2,0.3,0.4,0.5c0.2,0.3,0.3,0.5,0.2,0.1c-0.1-0.5-0.2-1.3-0.4-2.1c-0.1-0.6-0.2-0.7-0.3-1.1 c-0.1-0.5-0.2-0.8-0.3-1.3c-0.1-0.3-0.2-1.1-0.3-1.5c-0.1-0.5-0.1-1.4,0.3-1.8c0.3-0.3,0.9-0.4,1.3-0.2c0.5,0.3,0.8,1,0.9,1.3 c0.2,0.5,0.4,1.2,0.5,2c0.2,1,0.5,2.5,0.5,2.8c0-0.4-0.1-1.1,0-1.5c0.1-0.3,0.3-0.7,0.7-0.8c0.3-0.1,0.6-0.1,0.9-0.1 c0.3,0.1,0.6,0.3,0.8,0.5c0.4,0.6,0.4,1.9,0.4,1.8c0.1-0.4,0.1-1.2,0.3-1.6c0.1-0.2,0.5-0.4,0.7-0.5c0.3-0.1,0.7-0.1,1,0 c0.2,0,0.6,0.3,0.7,0.5c0.2,0.3,0.3,1.3,0.4,1.7c0,0.1,0.1-0.4,0.3-0.7c0.4-0.6,1.8-0.8,1.9,0.6c0,0.7,0,0.6,0,1.1 c0,0.5,0,0.8,0,1.2c0,0.4-0.1,1.3-0.2,1.7c-0.1,0.3-0.4,1-0.7,1.4c0,0-1.1,1.2-1.2,1.8c-0.1,0.6-0.1,0.6-0.1,1 c0,0.4,0.1,0.9,0.1,0.9s-0.8,0.1-1.2,0c-0.4-0.1-0.9-0.8-1-1.1c-0.2-0.3-0.5-0.3-0.7,0c-0.2,0.4-0.7,1.1-1.1,1.1 c-0.7,0.1-2.1,0-3.1,0c0,0,0.2-1-0.2-1.4c-0.3-0.3-0.8-0.8-1.1-1.1L11.3,20.4z"/>
        <line fill="none" stroke="#000000" stroke-width="0.75" stroke-linecap="round" x1="19.6" y1="20.7" x2="19.6" y2="17.3"/>
        <line fill="none" stroke="#000000" stroke-width="0.75" stroke-linecap="round" x1="17.6" y1="20.7" x2="17.5" y2="17.3"/>
        <line fill="none" stroke="#000000" stroke-width="0.75" stroke-linecap="round" x1="15.6" y1="17.3" x2="15.6" y2="20.7"/>
    </g>
</svg>`;

// 3. Grabbing Hand Cursor (stylistically consistent)
const grabbingCursorSVG = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(-8.5 -13.5)">
        <path d="M11.5 19.5h-1v-1h-1v-1h-1v-1h1v-1h1v-1h1v-1h-1v-1h-1v-1h-1v1h-1v1h-1v1h-1v1h1v1h1v1h1v1h-1v1h1v1h1v1h-1v-1h-1v1h-1v1h1v1h1v1h1v1h1v-1h-1v-1h1v-1h-1v-1zm1 1v1h1v1h1v-1h-1v-1h-1zm-1-1h1v1h-1v-1zm-1 0v-1h-1v1h1zm1-1h1v1h-1v-1zm8-1h1v1h-1v-1zm-1-1v1h-1v-1h1zm1-1v1h1v-1h-1zm1-1h1v1h-1v-1zm-1-1v-1h-1v1h1zm-1-1v-1h-1v1h1zm1-1v-1h-1v1h1zm-4-1h-1v-1h1v1zm1 1h-1v-1h1v1z" fill="#fff"/>
        <path d="M12.5 20.5v-1h-1v-1h-1v-1h1v-1h1v-1h-1v-1h-1v-1h-1v1h-1v1h-1v1h-1v1h1v1h1v1h1v1h-1v1h1v1h1v1h-1v-1h-1v1h-1v1h1v1h1v1h1v1h1v-1h-1v-1h1v-1h-1v-1h1v-1zm9-5v-1h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h1v-1h1v-1h-1v-1h-1v-1h1v-1h1v-1h1v1h1v1h1v1zm-2-1h1v1h-1v-1zm1-1v-1h-1v1h1zm-5-3h-1v-1h-1v-1h-1v1h-1v1h-1v1h1v1h1v1h1v-1h1v-1h1v-1zm-1-1v-1h-1v1h1z" fill="#000"/>
    </g>
</svg>`;

// Maps cursor state to the correct SVG and its hotspot (the active point of the cursor)
const CURSORS = {
  default: {
    uri: svgToDataURI(arrowCursorSVG),
    hotspot: { x: 2, y: 2 },
  },
  pointer: {
    uri: svgToDataURI(pointerCursorSVG),
    hotspot: { x: 9, y: 4 }, // Approx. fingertip position
  },
  grabbing: {
    uri: svgToDataURI(grabbingCursorSVG),
    hotspot: { x: 9, y: 4 }, // Same as pointer for consistency
  },
};

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'grabbing'>('default');
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isGloballyHidden, setIsGloballyHidden] = useState(false);

    useEffect(() => {
        document.body.classList.add('custom-cursor-active');

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, [role="button"], [onclick]')) {
                setCursorType('pointer');
            } else {
                setCursorType('default');
            }
        };
        
        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);

        document.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        
        const observer = new MutationObserver(() => {
            setIsGloballyHidden(document.body.classList.contains('native-cursor-active'));
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => {
            document.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.classList.remove('custom-cursor-active');
            observer.disconnect();
        };
    }, []);
    
    if (isGloballyHidden) {
        return null;
    }

    const finalCursorType = isMouseDown ? 'grabbing' : cursorType;
    const currentCursor = CURSORS[finalCursorType];
    const isInteracting = finalCursorType !== 'default';

    const styles = {
        cursor: {
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '32px',
            height: '32px',
            backgroundImage: `url('${currentCursor.uri}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            // Position using the cursor's hotspot for pixel-perfect alignment
            transform: `translate3d(${position.x - currentCursor.hotspot.x}px, ${position.y - currentCursor.hotspot.y}px, 0) scale(${isInteracting ? 1.2 : 1})`,
            pointerEvents: 'none',
            zIndex: 99999,
            willChange: 'transform',
            transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)',
        } as React.CSSProperties,
    };
    
    return createPortal(
        <div style={styles.cursor} aria-hidden="true" />,
        document.body
    );
};

export default CustomCursor;
