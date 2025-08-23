import React, { useState, useEffect } from 'react';

const cursorImage = 'https://cursor.in/assets/pointinghand.svg';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
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

        document.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            document.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);
    
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
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovering ? 1.2 : 1})`,
            pointerEvents: 'none',
            zIndex: 9999,
            transition: 'transform 0.1s ease-out',
            willChange: 'transform',
        } as React.CSSProperties,
    };
    
    return (
        <div style={styles.cursor} aria-hidden="true" />
    );
};

export default CustomCursor;