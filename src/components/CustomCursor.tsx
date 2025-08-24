import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const pointingHand = `data:image/svg+xml;utf8,%3Csvg width='48' height='48' viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.2,20.9,3.8,12.2a2.3,2.3,0,0,1,1-2.9l11.4-6a2.3,2.3,0,0,1,3,1l4.4,8.7a2.3,2.3,0,0,1-1,2.9L11.2,21.9A2.3,2.3,0,0,1,8.2,20.9Z' stroke='%23000' stroke-width='1' stroke-linejoin='round'/%3E%3C/svg%3E`;
const openHand = `data:image/svg+xml;utf8,%3Csvg width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 19.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5Z'/%3E%3Cpath d='M18 11.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5Z'/%3E%3Cpath d='m2 13.28 4.29 4.29c.94.94 2.48.94 3.42 0l2.58-2.58c.94-.94.94-2.48 0-3.42L8 7.28'/%3E%3Cpath d='m14 7.28 2.29-2.29c.94-.94 2.48-.94 3.42 0l1.29 1.29c.94.94.94-2.48 0 3.42L17 13.28'/%3E%3C/svg%3E`;
const closedHand = `data:image/svg+xml;utf8,%3Csvg width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 19.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5Z'/%3E%3Cpath d='M10 16.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5Z'/%3E%3Cpath d='M2 13.28V8.5c0-1.38 1.12-2.5 2.5-2.5h4c1.38 0 2.5 1.12 2.5 2.5v5.28'/%3E%3Cpath d='M14 11.28V8.5c0-1.38 1.12-2.5 2.5-2.5h1c1.38 0 2.5 1.12 2.5 2.5v2.78'/%3E%3Cpath d='M11 12.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5Z'/%3E%3Cpath d='M14 9.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5Z'/%3E%3C/svg%3E`;

const CustomCursor = () => {
    const [position, setPosition] = useState({ 
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : -100, 
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : -100 
    });
    const [isHovering, setIsHovering] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isGloballyHidden, setIsGloballyHidden] = useState(false);

    useEffect(() => {
        const checkVisibility = () => {
            setIsGloballyHidden(document.body.classList.contains('native-cursor-active'));
        };

        const observer = new MutationObserver(checkVisibility);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        
        checkVisibility(); // Initial check

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        document.body.classList.add('custom-cursor-active');

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            setIsHovering(!!target.closest('a, button, input, [role="button"], [onclick]'));
        };
        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);

        document.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            document.body.classList.remove('custom-cursor-active');
            document.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    if (isGloballyHidden) {
        return null;
    }

    const cursorImage = isMouseDown ? closedHand : (isHovering ? openHand : pointingHand);
    
    const styles = {
        cursor: {
            position: 'fixed',
            top: `${position.y - 24}px`,
            left: `${position.x - 24}px`,
            width: '48px',
            height: '48px',
            backgroundImage: `url('${cursorImage}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            transform: `scale(${isHovering || isMouseDown ? 1.2 : 1})`,
            pointerEvents: 'none',
            zIndex: 99999,
            transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
        } as React.CSSProperties,
    };
    
    return createPortal(
        <div style={styles.cursor} aria-hidden="true" />,
        document.body
    );
};

export default CustomCursor;