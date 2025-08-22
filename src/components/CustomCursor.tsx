import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        
        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, input')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            if (e.target.closest('a, button, input')) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);
    
    const styles = {
        cursorDot: {
            position: 'fixed',
            top: position.y,
            left: position.x,
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--foreground)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9999,
            transition: 'transform 0.1s ease-out'
        } as React.CSSProperties,
        cursorOutline: {
            position: 'fixed',
            top: position.y,
            left: position.x,
            width: '40px',
            height: '40px',
            border: '2px solid var(--foreground)',
            borderRadius: '50%',
            transform: isHovering ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(1)',
            opacity: isHovering ? 0.5 : 1,
            pointerEvents: 'none',
            zIndex: 9999,
            transition: 'transform 0.2s ease-out, opacity 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out',
        } as React.CSSProperties,
    };
    
    return (
        <>
            <div style={styles.cursorOutline} />
            <div style={styles.cursorDot} />
        </>
    );
};

export default CustomCursor;
