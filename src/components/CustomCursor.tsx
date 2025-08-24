import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const pointingHand = 'https://cursor.in/assets/pointinghand.svg';
const openHand = 'https://cursor.in/assets/openhand.svg';
const closedHand = 'https://cursor.in/assets/closedhand.svg';

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