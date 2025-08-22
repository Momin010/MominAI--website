import React, { useState, useEffect } from 'react';

// Optimized Base64 encoded hand cursor image, similar to the one provided
const cursorImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIaSURBVFhH7ZfNTsJQFIa/e+9dYkAPJk40Jg70KCZuPKCJDyFuDDfBiZcR0p0rLgAl9Gg8AKe4DR74UvRNQxLS2qGk+dM0U5P+k2y32+/bY15XGf+/h3I5n/I4L+R0XuR2XiQ3XyQ3XyS3XyRX/ohk+yHyYwZ+lGL4S4b+lGLoS4b+F8LQlwy/ZOhfKYa+ZOj/Uox/yvB/h+L/XG4/TIZP8rD/Iav9f5Lp+0S+f1nxf45w/P/v/F4kf//Z7e1n2e1n8vD/Irv9n2S6/Zf0/yK7/Z/8/012+1/Z/9vsvP0sT/+P/L/t7+e//v/bX/9//K/f/v7/xXb/Z7L9r5Ppf5bpf5bp+0yy/i+Tq//rX6q+r9f/VfWfrn8I/7D8f0n/h/R/SP+H9H/E9H/E9H/E9H+k/yP6P2L6P2L6P6a//hPTP2L6P6a//hPTP2L6P9J/R/0f0v8h/R/S/yH9H9L/If0f0v8h/d9/SP/3H9L/fUf//z+kf//H9H/fUf8//p/+Lz/9X376v/z0f/np/+Lz/8Xnf8LzP+H5n/D8z3j+Zzz/M57/Gc//jOd/xvM/Y/q/Y/q/Y/q/Y/q/Y/q/Y/q/Y/q/Y/q/ZPr+Jtn+kGR/SDK/ZDI/ZDI/ZHK+ZHK+5HG+5HG+yOV8yeVcyuUcyuX8Q4Z/yPDf5H/4C4m/9dsoBf76AAAAAElFTkSuQmCC';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 }); // Start off-screen
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
            if (!isVisible) setIsVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
        };
        
        const handleMouseOver = (e) => {
            // Check for common interactive elements
            if (e.target.closest('a, button, input, [role="button"], [onclick]')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            if (e.target.closest('a, button, input, [role="button"], [onclick]')) {
                setIsHovering(false);
            }
        };
        
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);


        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);
    
    const styles = {
        cursor: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '32px',
            height: '32px',
            backgroundImage: `url('${cursorImage}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            // Position the cursor via transform to leverage hardware acceleration
            transform: `translate3d(${position.x}px, ${position.y}px, 0) ${isHovering ? 'scale(1.2)' : 'scale(1)'}`,
            pointerEvents: 'none',
            zIndex: 9999,
            transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
            opacity: isVisible ? 1 : 0,
            willChange: 'transform, opacity', // Performance optimization
        } as React.CSSProperties,
    };
    
    return (
        <div style={styles.cursor} />
    );
};

export default CustomCursor;
