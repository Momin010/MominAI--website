import React, { useState, useEffect, useRef } from 'react';

// High-quality, optimized Base64 encoded hand cursor image from the provided asset.
const cursorImage = 'data:image/png;base64,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';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
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

        const handleMouseEnter = () => {
            if (cursorRef.current) cursorRef.current.style.opacity = '1';
        };
        
        const handleMouseLeave = () => {
            if (cursorRef.current) cursorRef.current.style.opacity = '0';
        };
        
        document.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseover', handleMouseOver);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);
    
    const styles = {
        cursor: {
            position: 'fixed',
            top: '-4px',
            left: '-4px',
            width: '32px',
            height: '32px',
            backgroundImage: `url('${cursorImage}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovering ? 1.2 : 1})`,
            pointerEvents: 'none',
            zIndex: 9999,
            transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
            opacity: 0,
            willChange: 'transform, opacity',
        } as React.CSSProperties,
    };
    
    return (
        <div ref={cursorRef} style={styles.cursor} aria-hidden="true" />
    );
};

export default CustomCursor;
