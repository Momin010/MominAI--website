import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// SVG content for the cursors, inlined to prevent cross-origin issues with COEP.
// The SVG strings are URI-encoded to be used in CSS.
const svgToDataURI = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

// Default cursor (open hand)
const pointingHandSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 27.5c0-.828.672-1.5 1.5-1.5h19c.828 0 1.5.672 1.5 1.5v12c0 .828-.672 1.5-1.5 1.5h-19c-.828 0-1.5-.672-1.5-1.5v-12z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 26V13c0-.828.672-1.5 1.5-1.5h2c.828 0 1.5.672 1.5 1.5v13" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 26V8.5c0-.828.672-1.5 1.5-1.5h2c.828 0 1.5.672 1.5 1.5V26" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 26V8.5c0-.828.672-1.5 1.5-1.5h2c.828 0 1.5.672 1.5 1.5V26" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27 26V13c0-.828.672-1.5 1.5-1.5h2c.828 0 1.5.672 1.5 1.5v13" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

// Hover cursor (pointing finger)
const openHandSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 27.5c0-.828.672-1.5 1.5-1.5h19c.828 0 1.5.672 1.5 1.5v12c0 .828-.672 1.5-1.5 1.5h-19c-.828 0-1.5-.672-1.5-1.5v-12z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 26V8.5c0-.828.672-1.5 1.5-1.5h2c.828 0 1.5.672 1.5 1.5V26" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 26v-9c0-.828.672-1.5 1.5-1.5h2c.828 0 1.5.672 1.5 1.5v9" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 26v-9c0-.828.672-1.5 1.5-1.5h2c.828 0 1.5.672 1.5 1.5v9" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27 26v-9c0-.828.672-1.5 1.5-1.5h2c.828 0 1.5.672 1.5 1.5v9" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

// Mousedown cursor (grabbing hand)
const closedHandSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 27.5c0-.828.672-1.5 1.5-1.5h19c.828 0 1.5.672 1.5 1.5v12c0 .828-.672 1.5-1.5 1.5h-19c-.828 0-1.5-.672-1.5-1.5v-12z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 26v-5.5c0-.828.672-1.5 1.5-1.5h2c.828 0 1.5.672 1.5 1.5V26" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 26V15c0-.828.672-1.5 1.5-1.5h2c.828 0 1.5.672 1.5 1.5v11" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 26V15c0-.828.672-1.5 1.5-1.5h2c.828 0 1.5.672 1.5 1.5v11" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27 26v-5.5c0-.828.672-1.5 1.5-1.5h2c.828 0 1.5.672 1.5 1.5V26" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

const pointingHand = svgToDataURI(pointingHandSVG);
const openHand = svgToDataURI(openHandSVG);
const closedHand = svgToDataURI(closedHandSVG);

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isGloballyHidden, setIsGloballyHidden] = useState(false);

    useEffect(() => {
        // Add class to body to hide native cursor, and remove on unmount
        document.body.classList.add('custom-cursor-active');

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, [role="button"], [onclick]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };
        
        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);

        document.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        
        // Use a MutationObserver to watch for class changes on the body,
        // which indicates we should hide the custom cursor (e.g., when over an iframe).
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
    
    // Hide the cursor if the body has the 'native-cursor-active' class
    if (isGloballyHidden) {
        return null;
    }

    const cursorImage = isMouseDown ? closedHand : (isHovering ? openHand : pointingHand);
    
    const styles = {
        cursor: {
            position: 'fixed',
            top: '0px', // Set to 0 and use transform for positioning
            left: '0px',
            width: '48px',
            height: '48px',
            backgroundImage: `url('${cursorImage}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            // Center the cursor on the pointer and handle scaling
            transform: `translate3d(${position.x - 24}px, ${position.y - 24}px, 0) scale(${isHovering || isMouseDown ? 1.2 : 1})`,
            pointerEvents: 'none',
            zIndex: 99999,
            willChange: 'transform',
            transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
        } as React.CSSProperties,
    };
    
    return createPortal(
        <div style={styles.cursor} aria-hidden="true" />,
        document.body
    );
};

export default CustomCursor;
