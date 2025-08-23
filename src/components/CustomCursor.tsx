import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const pointingHand = 'https://cursor.in/assets/pointinghand.svg';
const openHand = 'https://cursor.in/assets/openhand.svg';
const closedHand = 'https://cursor.in/assets/closedhand.svg';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check for fine pointer availability on mount
        const mediaQuery = window.matchMedia('(pointer: fine)');
        setIsVisible(mediaQuery.matches);

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

        return () => {
            document.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    
    if (!isVisible) {
        return null;
    }

    const cursorImage = isMouseDown ? closedHand : (isHovering ? openHand : pointingHand);
    
    const styles = {
        cursor: {
            position: 'fixed',
            top: '-6px',
            left: '-6px',
            width: '48px',
            height: '48px',
            backgroundImage: `url('${cursorImage}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovering || isMouseDown ? 1.2 : 1})`,
            pointerEvents: 'none',
            zIndex: 99999,
            willChange: 'transform',
        } as React.CSSProperties,
    };
    
    return createPortal(
        <div style={styles.cursor} aria-hidden="true" />,
        document.body
    );
};

export default CustomCursor;